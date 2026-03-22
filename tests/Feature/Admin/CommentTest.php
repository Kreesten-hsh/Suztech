<?php

use App\Models\Comment;
use App\Models\User;

test('verified admins can access the comment moderation page', function () {
    $admin = User::factory()->admin()->create();
    Comment::factory()->count(2)->create();

    $response = $this
        ->actingAs($admin)
        ->get(route('admin.comments.index'));

    $response->assertOk();
});

test('verified admins can delete comments', function () {
    $admin = User::factory()->admin()->create();
    $comment = Comment::factory()->create();

    $response = $this
        ->actingAs($admin)
        ->from(route('admin.comments.index'))
        ->delete(route('admin.comments.destroy', $comment));

    $response->assertRedirect(route('admin.comments.index', absolute: false));
    $this->assertDatabaseMissing('comments', [
        'id' => $comment->id,
    ]);
});
