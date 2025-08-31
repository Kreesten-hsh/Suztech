<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    // READ: Afficher la liste des catégories
    public function index()
    {
        $categories = Category::latest()->paginate(10);
        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories
        ]);
    }

    // CREATE: Afficher le formulaire de création
    public function create()
    {
        return Inertia::render('Admin/Categories/Create');
    }

    // CREATE: Enregistrer une nouvelle catégorie
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories',
        ]);

        Category::create([
            'name' => $request->name,
        ]);

        return redirect()->route('admin.categories.index')->with('success', 'Catégorie ajoutée avec succès.');
    }

    // UPDATE: Afficher le formulaire de modification
    public function edit(Category $category)
    {
        return Inertia::render('Admin/Categories/Edit', [ // <-- Correction ici
            'category' => $category
        ]);
    }

    // UPDATE: Mettre à jour une catégorie
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
        ]);

        $category->update([
            'name' => $request->name,
        ]);

        return redirect()->route('admin.categories.index')->with('success', 'Catégorie modifiée avec succès.');
    }

    // DELETE: Supprimer une catégorie
    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('admin.categories.index')->with('success', 'Catégorie supprimée avec succès.');
    }
}