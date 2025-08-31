<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage; // Importation ajoutée pour la suppression de fichiers

class ProductController extends Controller
{
    /**
     * READ: Afficher la liste des produits
     */
    // app/Http/Controllers/Admin/ProductController.php

    public function index()
    {
        $products = Product::with('category', 'images')->latest()->paginate(10);
        return Inertia::render('Admin/Products/Index', [
            'products' => $products
        ]);
    }

    /**
     * CREATE: Afficher le formulaire de création
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories
        ]);
    }

    /**
     * CREATE: Enregistrer un nouveau produit
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $product = Product::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'category_id' => $request->category_id,
            'description' => $request->description,
            'price' => $request->price,
        ]);

        foreach ($request->file('images') as $image) {
            $path = $image->store('products', 'public');
            $product->images()->create(['path' => $path]);
        }

        return redirect()->route('admin.products.index')->with('success', 'Produit ajouté avec succès.');
    }

    /**
     * UPDATE: Afficher le formulaire de modification
     */
    public function edit(Product $product)
    {
        $categories = Category::all();
        $product->load('images');
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    /**
     * UPDATE: Mettre à jour un produit
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Mise à jour des données du produit
        $product->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'category_id' => $request->category_id,
            'description' => $request->description,
            'price' => $request->price,
        ]);
        
        // Gestion des images
        if ($request->hasFile('images')) {
            // Supprimer les anciennes images
            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image->path);
                $image->delete();
            }

            // Enregistrer les nouvelles images
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $product->images()->create(['path' => $path]);
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Produit modifié avec succès.');
    }

    /**
     * DELETE: Supprimer un produit
     */
    public function destroy(Product $product)
    {
        // Supprimer les images liées au produit
        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->path);
        }
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Produit supprimé avec succès.');
    }
}