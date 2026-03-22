<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CommentController extends Controller
{
    public function index(): Response
    {
        // FIX: Paginate admin comments so the moderation screen stays responsive on large datasets.
        $comments = Comment::with('product')->latest()->paginate(15);

        return Inertia::render('Admin/CommentsIndex', [
            'comments' => $comments,
        ]);
    }

    public function destroy(Comment $comment): RedirectResponse
    {
        $comment->delete();

        return redirect()->back()->with('success', 'Le commentaire a ete supprime avec succes.');
    }
}
