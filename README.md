# SUZTECH Platform

**Modern Monolithic Web Platform & Business Portal (Laravel 12, Inertia.js v2, React 18 & Docker)**

[![Laravel](https://img.shields.io/badge/Backend-Laravel%2012-FF2D20?style=flat-square&logo=laravel&logoColor=white)](https://laravel.com/)
[![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=flat-square&logo=php&logoColor=white)](https://www.php.net/)
[![Inertia.js](https://img.shields.io/badge/Adapter-Inertia.js%20v2-9553E9?style=flat-square&logo=inertia&logoColor=white)](https://inertiajs.com/)
[![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Docker](https://img.shields.io/badge/Container-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Pest](https://img.shields.io/badge/Tests-Pest%20PHP-FA8072?style=flat-square)](https://pestphp.com/)

SUZTECH is a full-stack digital services, e-commerce, and back-office management platform built for SUZTECH in Benin. The architecture couples a robust Laravel 12 application core with an Inertia.js v2 / React 18 single-page frontend, delivering client-side routing speed with server-side routing security and simplicity.

---

## 🏗️ Architecture & Technology Stack

### Backend Core (Laravel 12 & PHP 8.2)
- **Framework**: Laravel 12 on PHP 8.2+ with strict typing.
- **Persistence**: MySQL 8.0+ / MariaDB with transactional schema migrations.
- **Authentication**: Custom authentication pipeline (`CustomAuthController`) implementing role-based access control (RBAC), CSRF protection, and email verification.
- **Test Suite**: Automated feature and unit tests with Pest PHP.

### Frontend Engine (Inertia.js v2 & React 18)
- **View Layer**: React 18 components compiled via Vite 7.
- **Bridge**: Inertia.js v2 (zero REST API boilerplate; server controllers directly return typed React props).
- **Styling**: Tailwind CSS v3 design system with responsive utility constraints.

### Production Runtime
- **Containerization**: Multi-stage Docker image combining Nginx and PHP-FPM.
- **Performance Optimizations**: Pre-warmed OPcache, compiled route and configuration caches, and immutable asset hashing.
- **Deployment**: Production container deployment on Render.com.

---

## 🛠️ Local Development & Quickstart

### Prerequisites
- PHP 8.2 or later
- Composer 2+
- Node.js 20+ & npm
- MySQL 8.0+ / MariaDB

### 1. Repository Setup & Dependencies

```bash
# Clone repository
git clone https://github.com/Kreesten-hsh/Suztech.git
cd Suztech

# Environment initialization
cp .env.example .env

# Install backend and frontend packages
composer install
npm install

# Generate application key
php artisan key:generate
```

### 2. Database Configuration & Storage Link

Configure database credentials in `.env`, then execute migrations and create the symlink for public media:

```bash
php artisan migrate
php artisan storage:link
```

### 3. Launch Development Servers

```bash
# Terminal 1: PHP server
php artisan serve

# Terminal 2: Vite hot-module replacement
npm run dev
```

The application will be accessible at `http://127.0.0.1:8000`.

### 4. Running the Test Suite

```bash
# Execute entire test suite
php artisan test

# Run feature tests specifically
php artisan test --testsuite=Feature
```

---

## 🚀 Production Deployment (Docker / Render.com)

The repository includes a production-ready `Dockerfile` bundling Nginx and PHP-FPM.

### Deployment Checklist

1. Create a Web Service on Render pointing to the repository.
2. Configure mandatory production environment variables (`APP_KEY`, `APP_URL`, `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, `SESSION_SECURE_COOKIE=true`).
3. Run migrations on container startup:
   ```bash
   php artisan migrate --force
   ```
4. Verify application health using Laravel's native probe: `GET /up`.

---

## 👥 Core Team & Leadership

- **HOUNGBO Tobias** : CEO & Strategic Direction
- **AGBOTON Kreesten** : Lead Web & Platform Developer
- **SOKENOU Evrard** : Accounting & Finance Operations

---

## 📄 License

Proprietary enterprise project maintained by SUZTECH SARL.
