<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CommentController as AdminCommentController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CustomAuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

// Public routes
// FIX: Keep a single home route definition to avoid duplicate route declarations.
Route::get('/', [HomeController::class, 'index'])->name('home');

// PERF: Replace closure routes with controller actions so route caching stays available in production.
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/services', [PageController::class, 'services'])->name('services');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');

Route::get('/shop', [ShopController::class, 'index'])->name('shop.index');
Route::get('/shop/{product}', [ShopController::class, 'show'])->name('shop.show');

// SECURITY: Keep custom authentication routes accessible only to guests.
Route::middleware('guest')->group(function () {
    Route::get('/login', [CustomAuthController::class, 'createLogin'])->name('login');
    Route::post('/login', [CustomAuthController::class, 'storeLogin']);
    Route::get('/register', [CustomAuthController::class, 'createRegister'])->name('register');
    Route::post('/register', [CustomAuthController::class, 'storeRegister'])->middleware('throttle:5,1');
});

// SECURITY: Logout must remain available only to authenticated users.
Route::post('/logout', [CustomAuthController::class, 'destroy'])->middleware('auth')->name('logout');

// Authenticated routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // PERF: Use controller-based verification routes so route:cache remains compatible with the auth flow.
    Route::get('/verify-email', EmailVerificationPromptController::class)->name('verification.notice');
    Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');
    Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    // Admin routes with named prefixes
    Route::middleware(['verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

        Route::resource('products', ProductController::class)->except(['show']);
        Route::resource('categories', CategoryController::class)->except(['show']);

        Route::get('/comments', [AdminCommentController::class, 'index'])->name('comments.index');
        Route::delete('/comments/{comment}', [AdminCommentController::class, 'destroy'])->name('comments.destroy');
    });
});

// Routes pour les commentaires
// SECURITY: Rate-limit public comment submissions to reduce spam and brute-force abuse.
Route::post('/comments', [CommentController::class, 'store'])->middleware('throttle:3,1')->name('comments.store');
