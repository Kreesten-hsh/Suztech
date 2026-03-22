<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $recentProducts = Product::with('category')->latest()->limit(5)->get();
        $recentComments = Comment::with('product')->latest()->limit(5)->get();

        return Inertia::render('Admin/DashboardPage', [
            'stats' => [
                'totalUsers' => User::count(),
                'totalProducts' => Product::count(),
                'totalCategories' => Category::count(),
                'totalAdmins' => User::where('is_admin', true)->count(),
                'totalComments' => Comment::count(),
            ],
            'recentProducts' => $recentProducts,
            'recentComments' => $recentComments,
        ]);
    }
}
