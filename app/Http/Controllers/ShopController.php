<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    /**
     * Display a listing of the products for the shop page.
     */
    public function index(Request $request)
    {
        // On récupère le paramètre 'category' de l'URL
        $categoryId = $request->input('category');

        // On crée la requête de base
        $query = Product::with(['category', 'images'])->latest();

        // Si une catégorie est spécifiée, on filtre la requête
        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        $products = $query->paginate(12);
        $categories = Category::all();

        return Inertia::render('Shop/Index', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function show(Product $product)
    {
        // Charge la catégorie et les images associées au produit
        $product->load('category', 'images');

        // Récupérer des produits similaires (par exemple, de la même catégorie, exclus le produit actuel)
        $similarProducts = Product::where('category_id', $product->category_id)
                                    ->where('id', '!=', $product->id)
                                    ->with('images') // Charger les images pour les produits similaires
                                    ->inRandomOrder() // Pour un peu de variété
                                    ->take(4) // Limiter à 4 produits similaires
                                    ->get();

        return Inertia::render('Shop/Show', [
            'product' => $product,
            'similarProducts' => $similarProducts, // Passer les produits similaires à la vue
        ]);
    }
}