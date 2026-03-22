# Render Deployment Design

**Date:** 2026-03-22

**Goal:** Deploy the existing Laravel + React/Vite application to Render with a versioned Docker-based setup and external MySQL on Aiven.

## Current State

- The repository already contains a Docker-based Render service definition in `render.yaml`.
- The app is a Laravel 12 application with a Vite-built React frontend.
- Production database credentials live outside the repo in `.env`.
- The Docker image currently caches Laravel configuration during image build, which risks freezing empty or placeholder production values before Render injects runtime environment variables.

## Approved Approach

Use the existing Docker-based deployment path and make it production-safe:

1. Keep a single Render web service defined in `render.yaml`.
2. Store secret or environment-specific values in Render instead of the repo.
3. Pass non-secret Vite environment values into the Docker build explicitly.
4. Regenerate Laravel caches at container startup so Render runtime variables are applied correctly.
5. Start with the simple MySQL SSL variant for Aiven:
   - rely on the existing MySQL connection configuration
   - do not require a CA certificate on day one
   - document the optional `MYSQL_ATTR_SSL_CA` path for a stricter follow-up if Aiven rejects the connection

## Files To Update

- `render.yaml`
- `Dockerfile`
- `entrypoint.sh`
- `config/app.php`
- `.env.production.example`

## Expected Outcome

- Render can create the service from the repository Blueprint.
- The image builds with the right Vite variables.
- Laravel boots with the environment values injected by Render at runtime.
- The app can connect to the external Aiven MySQL database using Render-managed environment variables.
