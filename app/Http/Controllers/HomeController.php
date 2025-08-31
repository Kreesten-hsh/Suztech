<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with a selection of products.
     */
    public function index()
    {
        // On récupère les 3 derniers produits ajoutés à la base de données
        $latestProducts = Product::with('category', 'images')->latest()->take(3)->get();

        return Inertia::render('Home', [
            'latestProducts' => $latestProducts,
        ]);
    }
}