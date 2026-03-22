<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

test('verified admins can create products', function () {
    $cloudinaryFacade = 'CloudinaryLabs\\CloudinaryLaravel\\Facades\\Cloudinary';

    if (! class_exists($cloudinaryFacade)) {
        $this->markTestSkipped('Cloudinary Laravel package is not installed in this environment.');
    }

    $admin = User::factory()->admin()->create();
    $category = Category::factory()->create();
    $image = UploadedFile::fake()->create('ordinateur-portable.jpg', 256, 'image/jpeg');

    $cloudinaryFacade::shouldReceive('upload')
        ->once()
        ->andReturn(new class
        {
            public function getSecurePath(): string
            {
                return 'https://res.cloudinary.com/suztech/image/upload/v1/suztech/products/ordinateur-portable.jpg';
            }

            public function getPublicId(): string
            {
                return 'suztech/products/ordinateur-portable';
            }
        });

    $response = $this
        ->actingAs($admin)
        ->post(route('admin.products.store'), [
            'name' => 'Ordinateur Portable Pro',
            'category_id' => $category->id,
            'description' => 'Ordinateur puissant pour la bureautique avancee.',
            'price' => 425000,
            'images' => [$image],
        ]);

    $product = Product::query()->where('slug', Str::slug('Ordinateur Portable Pro'))->first();

    $response->assertRedirect(route('admin.products.index', absolute: false));
    expect($product)->not->toBeNull();
    $this->assertDatabaseHas('products', [
        'name' => 'Ordinateur Portable Pro',
        'category_id' => $category->id,
    ]);
    $this->assertDatabaseHas('product_images', [
        'product_id' => $product->id,
        'cloudinary_public_id' => 'suztech/products/ordinateur-portable',
    ]);
    expect($product->images)->toHaveCount(1);
});

test('verified admins can update products', function () {
    $admin = User::factory()->admin()->create();
    $category = Category::factory()->create();
    $newCategory = Category::factory()->create();
    $product = Product::factory()->for($category)->create([
        'name' => 'Laptop Office',
        'slug' => 'laptop-office',
    ]);

    $response = $this
        ->actingAs($admin)
        ->put(route('admin.products.update', $product), [
            'name' => 'Laptop Office Plus',
            'category_id' => $newCategory->id,
            'description' => 'Version mise a jour pour les professionnels.',
            'price' => 510000,
        ]);

    $response->assertRedirect(route('admin.products.index', absolute: false));
    $this->assertDatabaseHas('products', [
        'id' => $product->id,
        'name' => 'Laptop Office Plus',
        'slug' => 'laptop-office-plus',
        'category_id' => $newCategory->id,
    ]);
});

test('verified admins can delete products', function () {
    $admin = User::factory()->admin()->create();
    $product = Product::factory()->create();

    $response = $this
        ->actingAs($admin)
        ->delete(route('admin.products.destroy', $product));

    $response->assertRedirect(route('admin.products.index', absolute: false));
    $this->assertDatabaseMissing('products', [
        'id' => $product->id,
    ]);
});
