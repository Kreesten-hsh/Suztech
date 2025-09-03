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
        $similarProducts = Product::where('id', '!=', $product->id)
                                    ->where('category_id', $product->category_id)
                                    ->inRandomOrder()
                                    ->limit(4)
                                    ->get();
                                    
        // Charge les commentaires liés au produit, triés par le plus récent
        $comments = $product->comments()->latest()->get();

        return Inertia::render('Shop/Show', [
            'product' => $product->load('images'),
            'similarProducts' => $similarProducts->load('images'),
            'comments' => $comments,
        ]);
    }
}