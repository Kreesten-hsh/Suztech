# Code Quality And Test Alignment Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Align the codebase with the real custom-auth architecture, remove dead dependencies, and replace the failing Breeze-oriented test suite with Pest coverage that matches production behavior.

**Architecture:** Keep the existing Laravel + Inertia behavior intact while removing legacy Breeze artifacts that are no longer routed. Add missing model factories first, then rewrite feature tests around public shop flows, custom auth flows, and verified admin flows.

**Tech Stack:** Laravel 12, PHP 8.2, Pest PHP, React 18, Inertia.js v2

---

### Task 1: Add Missing Factories

**Files:**
- Create: `database/factories/CategoryFactory.php`
- Create: `database/factories/ProductFactory.php`
- Create: `database/factories/CommentFactory.php`
- Modify: `database/factories/UserFactory.php`

**Step 1: Write the factory implementations**

Use realistic Faker data for names, descriptions, comments, and prices. Add an `admin()` state to `UserFactory`.

**Step 2: Verify relations**

Ensure `ProductFactory` creates a category by default and `CommentFactory` creates a product by default.

### Task 2: Rewrite Feature Tests In Pest

**Files:**
- Modify: `tests/Feature/Auth/AuthenticationTest.php`
- Modify: `tests/Feature/Auth/RegistrationTest.php`
- Modify: `tests/Feature/Auth/PasswordResetTest.php`
- Modify: `tests/Feature/Auth/EmailVerificationTest.php`
- Modify: `tests/Feature/Auth/PasswordConfirmationTest.php`
- Modify: `tests/Feature/Auth/PasswordUpdateTest.php`
- Modify: `tests/Feature/ProfileTest.php`
- Create: `tests/Feature/ShopTest.php`
- Create: `tests/Feature/Admin/ProductTest.php`
- Create: `tests/Feature/Admin/CommentTest.php`

**Step 1: Replace Breeze assumptions**

Cover the custom login/register/logout flow, current email verification flow, and intentionally absent Breeze password flows.

**Step 2: Add shop/admin coverage**

Cover shop listing/detail/comment creation and verified admin CRUD/moderation behavior.

**Step 3: Run Pest**

Run the feature suite and fix any failures against the real route map.

### Task 3: Clean Controllers And Legacy Auth Artifacts

**Files:**
- Modify: `app/Http/Controllers/Admin/AdminDashboardController.php`
- Modify: `resources/js/Pages/Admin/DashboardPage.jsx`
- Modify: `routes/auth.php`
- Delete if unused: `app/Http/Controllers/Auth/ConfirmablePasswordController.php`
- Delete if unused: `app/Http/Controllers/Auth/NewPasswordController.php`
- Delete if unused: `app/Http/Controllers/Auth/PasswordController.php`
- Delete if unused: `app/Http/Controllers/Auth/PasswordResetLinkController.php`
- Delete if unused: `app/Http/Controllers/Auth/RegisteredUserController.php`

**Step 1: Remove dead legacy auth paths**

Keep only the controllers still referenced by `routes/web.php`.

**Step 2: Align dashboard payloads**

Either stop sending unused props or render them meaningfully.

### Task 4: Remove Dead Dependencies

**Files:**
- Modify: `composer.json`
- Modify: `package.json`
- Update lockfiles if tooling permits

**Step 1: Remove unused packages**

Drop Breeze, Sanctum, and `@tailwindcss/vite`.

**Step 2: Sync lockfiles**

Regenerate package/composer locks if possible in the local environment.

### Task 5: Add Operational Documentation

**Files:**
- Modify: `README.md`
- Create: `.env.production.example`

**Step 1: Preserve marketing copy**

Append technical setup and deployment sections instead of replacing the existing README content.

**Step 2: Document production configuration**

Comment every environment variable in `.env.production.example`, including mail, DB, logging, cookies, and the Formspree configuration note.
