# Render Deployment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the repository's Docker-based Render deployment reproducible and safe for a Laravel production environment backed by external Aiven MySQL.

**Architecture:** Keep a single Docker web service in Render. Let Render own runtime configuration and secrets, expose only the non-secret values needed at Docker build time, and regenerate Laravel caches when the container starts so runtime environment variables are respected.

**Tech Stack:** Render Blueprints, Docker multi-stage build, Laravel 12, PHP 8.2, Nginx, PHP-FPM, Vite, React

---

### Task 1: Version the Render service configuration

**Files:**
- Modify: `render.yaml`
- Modify: `.env.production.example`

**Step 1: Define Render-managed environment variables**

- Keep the web service on `runtime: docker`.
- Replace committed placeholder secrets with `sync: false`.
- Use `generateValue: true` for `APP_KEY`.
- Add `PORT=80` so Render targets the Nginx listener consistently.

**Step 2: Document the production inputs**

- Align `.env.production.example` with the Blueprint.
- Keep the simple Aiven SSL path by default.
- Document the optional `MYSQL_ATTR_SSL_CA` escape hatch for stricter SSL later.

### Task 2: Make the Docker image consume the right environment at the right phase

**Files:**
- Modify: `Dockerfile`
- Modify: `entrypoint.sh`
- Modify: `config/app.php`

**Step 1: Fix build-time frontend variables**

- Declare Docker `ARG` values for the Vite variables.
- Promote them to `ENV` before `npm run build`.

**Step 2: Fix runtime Laravel configuration**

- Stop caching Laravel config during image build.
- Clear and rebuild Laravel caches in the entrypoint before migrations.
- Default Laravel's application URL to Render's runtime hostname when `APP_URL` is not explicitly set.

### Task 3: Verify the deployment assets

**Files:**
- Verify: `render.yaml`
- Verify: `Dockerfile`
- Verify: `entrypoint.sh`
- Verify: `config/app.php`
- Verify: `.env.production.example`

**Step 1: Run focused checks**

- Run `php -l config/app.php`
- Run `npm run build`
- Review `git diff --stat`

**Step 2: Inspect remaining manual steps**

- Confirm which values still need to be entered in Render during the first Blueprint creation flow.
