<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the home page with a selection of products.
     */
    public function index(Request $request): Response
    {
        // FIX: Normalize featured products through ProductResource before sending them to Inertia.
        $latestProducts = Product::with('category', 'images')->latest()->take(3)->get();

        return Inertia::render('Home', [
            'latestProducts' => ProductResource::collection($latestProducts)->resolve($request),
        ]);
    }
}
