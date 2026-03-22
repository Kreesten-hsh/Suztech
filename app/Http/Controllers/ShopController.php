<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ShopController extends Controller
{
    /**
     * Display a listing of the products for the shop page.
     */
    public function index(Request $request): Response
    {
        $categoryId = $request->input('category');

        $query = Product::with(['category', 'images'])->latest();

        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        $products = $query->paginate(12);
        $categories = Category::all();

        return Inertia::render('Shop/Index', [
            // PERF: Keep shop product payloads consistent while paginating efficiently.
            'products' => ProductResource::collection($products),
            'categories' => $categories,
        ]);
    }

    public function show(Request $request, Product $product): Response
    {
        // PERF: Fetch only candidate IDs, randomize them in PHP, then hydrate at most four similar products.
        $similarProductIds = Product::query()
            ->where('id', '!=', $product->id)
            ->where('category_id', $product->category_id)
            ->pluck('id')
            ->all();

        shuffle($similarProductIds);
        $similarProductIds = array_slice($similarProductIds, 0, 4);

        $similarProducts = Product::with(['category', 'images'])
            ->when(
                $similarProductIds !== [],
                fn ($query) => $query->whereIn('id', $similarProductIds),
                fn ($query) => $query->whereRaw('1 = 0')
            )
            ->limit(4)
            ->get()
            ->sortBy(fn (Product $similarProduct) => array_search($similarProduct->id, $similarProductIds, true))
            ->values();

        $comments = $product->comments()->latest()->get();

        return Inertia::render('Shop/Show', [
            // PERF: Keep product payloads normalized through ProductResource.
            'product' => new ProductResource($product->load(['category', 'images'])),
            'similarProducts' => ProductResource::collection($similarProducts)->resolve($request),
            'comments' => $comments,
        ]);
    }
}
