FROM composer:2 AS vendor

WORKDIR /app

# SECURITY: Install PHP dependencies in an isolated stage to keep the final image minimal.
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --no-interaction \
    --no-scripts \
    --prefer-dist \
    --optimize-autoloader

FROM node:20-alpine AS frontend

WORKDIR /app

# PERF: Use npm ci for deterministic installs in CI/CD and production builds.
COPY package.json package-lock.json ./
RUN npm ci

COPY jsconfig.json postcss.config.js tailwind.config.js vite.config.js ./
COPY resources ./resources
COPY public ./public
RUN npm run build

FROM php:8.2-fpm-alpine AS runtime

WORKDIR /var/www/html

# SECURITY: Install only runtime packages required by PHP-FPM and Nginx.
RUN apk add --no-cache \
        nginx \
        curl \
        libpng-dev \
        libjpeg-turbo-dev \
        libwebp-dev \
        zip \
        unzip \
        libcap-utils \
    && docker-php-ext-configure gd --with-jpeg --with-webp \
    && docker-php-ext-install -j"$(nproc)" gd pdo_mysql opcache \
    && setcap 'cap_net_bind_service=+ep' /usr/sbin/nginx \
    && mkdir -p \
        /var/cache/nginx \
        /tmp/nginx \
        /var/www/html/storage \
        /var/www/html/storage/framework/cache \
        /var/www/html/storage/framework/sessions \
        /var/www/html/storage/framework/views \
        /var/www/html/bootstrap/cache

# SECURITY: Copy the application after .dockerignore filtering to avoid leaking local secrets into the image.
COPY --chown=www-data:www-data . .
COPY --from=vendor --chown=www-data:www-data /app/vendor ./vendor
COPY --from=frontend --chown=www-data:www-data /app/public/build ./public/build
COPY --chown=www-data:www-data .docker/nginx/default.conf /etc/nginx/nginx.conf
COPY --chown=www-data:www-data .docker/php/opcache.ini /usr/local/etc/php/conf.d/zz-opcache.ini
# PROD: Use the repository entrypoint so Render startup, migrations, and background services stay centralized.
COPY entrypoint.sh /entrypoint.sh

# SECURITY: Ensure writable runtime directories are owned by the unprivileged user.
RUN chown -R www-data:www-data /var/www/html /var/cache/nginx /tmp/nginx \
    && chmod +x /entrypoint.sh \
    && chmod -R ug+rwx /var/www/html/storage /var/www/html/bootstrap/cache \
    # PERF: Warm the Laravel package manifest and runtime caches during the image build.
    && php artisan package:discover --ansi \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache \
    && php artisan event:cache

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD curl -fsS http://127.0.0.1/up || exit 1

EXPOSE 80

# SECURITY: Run the final container as the unprivileged www-data user.
USER www-data

# PROD: Delegate container startup to the shared entrypoint script instead of an inline shell command.
ENTRYPOINT ["/entrypoint.sh"]
