<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\ProductResource;

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
            // Correction : Utiliser la ressource pour formater les produits
            'products' => ProductResource::collection($products),
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
            // Correction 1 : Utiliser la ressource pour le produit principal
            'product' => new ProductResource($product->load('images')),
            // Correction 2 : Utiliser la ressource pour les produits similaires
            'similarProducts' => ProductResource::collection($similarProducts->load('images')),
            'comments' => $comments,
        ]);
    }
}