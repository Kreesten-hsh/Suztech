<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use Inertia\Inertia;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'comment' => 'required|string',
            'product_id' => 'required|exists:products,id',
        ]);

        Comment::create($validatedData);

        // Ajout du message de succès pour l'utilisateur
        return redirect()->back()->with('success', 'Votre commentaire a été ajouté avec succès !');
    }
}