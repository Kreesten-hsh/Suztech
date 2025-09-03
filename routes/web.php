<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\CustomAuthController;
use App\Http\Controllers\ShopController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Admin\CommentController as AdminCommentController;
use Inertia\Inertia;

// Public routes
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/services', function () {
    return Inertia::render('Services');
})->name('services');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/shop', [ShopController::class, 'index'])->name('shop.index');
Route::get('/shop/{product}', [ShopController::class, 'show'])->name('shop.show');

// Custom authentication routes
Route::get('/login', [CustomAuthController::class, 'createLogin'])->name('login');
Route::post('/login', [CustomAuthController::class, 'storeLogin']);
Route::get('/register', [CustomAuthController::class, 'createRegister'])->name('register');
Route::post('/register', [CustomAuthController::class, 'storeRegister']);
Route::post('/logout', [CustomAuthController::class, 'destroy'])->name('logout');

// Authenticated routes
Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin routes with named prefixes
    Route::middleware(['verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');

        Route::resource('products', ProductController::class)->except(['show']);
        Route::resource('categories', CategoryController::class)->except(['show']);
        
        // Routes pour la gestion des commentaires
        Route::get('/comments', [AdminCommentController::class, 'index'])->name('comments.index');
        Route::delete('/comments/{comment}', [AdminCommentController::class, 'destroy'])->name('comments.destroy');
    });

});

//Routes pour les commentaires
Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
