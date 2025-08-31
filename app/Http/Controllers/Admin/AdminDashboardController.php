<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'totalUsers' => User::count(),
            'totalProducts' => Product::count(),
            'totalCategories' => Category::count(),
            'totalAdmins' => User::where('is_admin', true)->count(),
        ];

        $admins = User::where('is_admin', true)->select('id', 'name', 'email', 'created_at')->get();

        $recentProducts = Product::with('category')->latest()->take(5)->get();

        return Inertia::render('Admin/DashboardPage', [
            'stats' => $stats,
            'admins' => $admins,
            'recentProducts' => $recentProducts,
        ]);
    }
}
