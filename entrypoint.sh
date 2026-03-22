#!/bin/sh

set -e

# PROD: Standardize startup logs so Render output shows each bootstrap step clearly.
log() {
    echo "[entrypoint] $1"
}

# PROD: Clear file-based Laravel optimization artifacts without touching the runtime cache store.
clear_bootstrap_artifacts() {
    php artisan config:clear
    php artisan route:clear
    php artisan view:clear
    php artisan event:clear
}

cd /var/www/html

if [ -n "${RENDER_EXTERNAL_HOSTNAME:-}" ] && [ "${APP_ENV:-local}" = "local" ]; then
    log "APP_ENV is local on Render; set APP_ENV=production in the Render environment settings"
fi

# PROD: Always clear stale build-time artifacts before booting the application.
log "Clearing Laravel bootstrap artifacts"
clear_bootstrap_artifacts

if [ "${APP_ENV:-production}" = "production" ]; then
    # PROD: Run migrations before warming caches so database-backed features are ready.
    log "Running database migrations"
    php artisan migrate --force
    # PROD: Warm Laravel caches only after Render runtime variables are available.
    log "Rebuilding Laravel bootstrap caches for production"
    php artisan optimize
else
    # PROD: Skip forced migrations outside production to avoid surprising local environment changes.
    log "Skipping production migrations because APP_ENV=${APP_ENV:-undefined}"
fi

PHP_FPM_PID=""
QUEUE_PID=""

# PROD: Start PHP-FPM in the background so Nginx can proxy requests inside the same container.
log "Starting PHP-FPM"
php-fpm -F &
PHP_FPM_PID=$!

if [ "${QUEUE_CONNECTION:-sync}" != "sync" ]; then
    # PROD: Run a queue worker only when the deployment is configured for asynchronous jobs.
    log "Starting queue worker for QUEUE_CONNECTION=${QUEUE_CONNECTION}"
    php artisan queue:work --sleep=3 --tries=3 --max-time=3600 &
    QUEUE_PID=$!
else
    # PROD: Skip the worker when sync queues are intentionally used in production.
    log "Skipping queue worker because QUEUE_CONNECTION=${QUEUE_CONNECTION:-sync}"
fi

# PROD: Stop background processes cleanly when the container receives a shutdown signal.
cleanup() {
    log "Stopping background services"

    if [ -n "${QUEUE_PID}" ]; then
        kill "${QUEUE_PID}" 2>/dev/null || true
    fi

    if [ -n "${PHP_FPM_PID}" ]; then
        kill "${PHP_FPM_PID}" 2>/dev/null || true
    fi
}

trap cleanup INT TERM

# PROD: Keep Nginx in the foreground so the container lifecycle follows the web server state.
log "Starting Nginx"
nginx -g 'daemon off;'
EXIT_CODE=$?

cleanup

exit "${EXIT_CODE}"
