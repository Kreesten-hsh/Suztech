<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentController extends Controller
{
    public function index()
    {
        // Récupère tous les commentaires avec les informations sur le produit associé.
        $comments = Comment::with('product')->latest()->get();

        return Inertia::render('Admin/CommentsIndex', [
            'comments' => $comments,
        ]);
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();

        return redirect()->back()->with('success', 'Le commentaire a été supprimé avec succès.');
    }
}