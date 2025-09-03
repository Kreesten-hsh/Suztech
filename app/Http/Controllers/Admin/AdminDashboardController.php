<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Models\Category;
use App\Models\Comment; // N'oubliez pas d'importer le modèle Comment
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // Statistiques
        $totalUsers = User::count();
        $totalProducts = Product::count();
        $totalCategories = Category::count();
        $totalAdmins = User::where('is_admin', true)->count();
        $totalComments = Comment::count(); // Récupère le nombre total de commentaires

        // Données récentes
        $recentProducts = Product::latest()->limit(5)->get(); // Exemple de données
        
        // Récupère les 5 derniers commentaires avec leur produit associé
        $recentComments = Comment::with('product')->latest()->limit(5)->get();

        return Inertia::render('Admin/DashboardPage', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'totalProducts' => $totalProducts,
                'totalCategories' => $totalCategories,
                'totalAdmins' => $totalAdmins,
                'totalComments' => $totalComments, // Passez le nombre total de commentaires
            ],
            'admins' => User::where('is_admin', true)->get(),
            'recentProducts' => $recentProducts,
            'recentComments' => $recentComments, // Passez les commentaires à la vue
        ]);
    }
}