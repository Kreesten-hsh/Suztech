<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    // READ: Afficher la liste des categories
    public function index(): Response
    {
        $categories = Category::latest()->paginate(10);

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    // CREATE: Afficher le formulaire de creation
    public function create(): Response
    {
        return Inertia::render('Admin/Categories/Create');
    }

    // CREATE: Enregistrer une nouvelle categorie
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories',
        ]);

        Category::create([
            'name' => $request->name,
        ]);

        return redirect()->route('admin.categories.index')->with('success', 'Categorie ajoutee avec succes.');
    }

    // UPDATE: Afficher le formulaire de modification
    public function edit(Category $category): Response
    {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
        ]);
    }

    // UPDATE: Mettre a jour une categorie
    public function update(Request $request, Category $category): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,'.$category->id,
        ]);

        $category->update([
            'name' => $request->name,
        ]);

        return redirect()->route('admin.categories.index')->with('success', 'Categorie modifiee avec succes.');
    }

    // DELETE: Supprimer une categorie
    public function destroy(Category $category): RedirectResponse
    {
        // FIX: Block deletion when products are still attached to avoid unintended cascade deletes.
        if ($category->products()->exists()) {
            return redirect()
                ->back()
                ->withErrors([
                    'category' => 'Impossible de supprimer cette categorie car elle contient encore des produits.',
                ]);
        }

        $category->delete();

        return redirect()->route('admin.categories.index')->with('success', 'Categorie supprimee avec succes.');
    }
}
