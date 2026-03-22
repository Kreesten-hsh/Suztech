<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        // SECURITY: Reject submissions that fill the hidden honeypot field to slow automated spam bots.
        if ($request->filled('website')) {
            return redirect()
                ->back()
                ->withErrors([
                    'comment' => 'La soumission a ete rejetee.',
                ])
                ->withInput($request->except('website'));
        }

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
