<?php

use App\Models\Comment;
use App\Models\Product;

test('shop index can be rendered', function () {
    Product::factory()->count(3)->create();

    $response = $this->get(route('shop.index'));

    $response->assertOk();
});

test('shop product detail can be rendered', function () {
    $product = Product::factory()->create();

    $response = $this->get(route('shop.show', $product));

    $response->assertOk();
});

test('public visitors can post a comment on a product', function () {
    $product = Product::factory()->create();

    $response = $this
        ->from(route('shop.show', $product))
        ->post(route('comments.store'), [
            'name' => 'Clarisse Dossou',
            'comment' => 'Le produit a l air bien fini et tres utile.',
            'product_id' => $product->id,
            'website' => '',
        ]);

    $response->assertRedirect(route('shop.show', $product, absolute: false));
    $response->assertSessionHas('success');
    $this->assertDatabaseHas('comments', [
        'product_id' => $product->id,
        'name' => 'Clarisse Dossou',
    ]);
    expect(Comment::query()->count())->toBe(1);
});
