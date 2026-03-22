<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;
use Throwable;

class ProductController extends Controller
{
    /**
     * READ: Afficher la liste des produits
     */
    public function index(): Response
    {
        $products = Product::with('category', 'images')->latest()->paginate(10);

        return Inertia::render('Admin/Products/Index', [
            'products' => ProductResource::collection($products),
        ]);
    }

    /**
     * CREATE: Afficher le formulaire de creation
     */
    public function create(): Response
    {
        $categories = Category::all();

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * CREATE: Enregistrer un nouveau produit
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            // FIX: Cap product uploads at five images per request.
            'images' => 'required|array|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $slug = Str::slug($validated['name']);

        // FIX: Validate slug uniqueness against the persisted column instead of trusting name uniqueness.
        validator(
            ['slug' => $slug],
            ['slug' => ['required', Rule::unique('products', 'slug')]]
        )->validate();

        $storedImages = [];

        try {
            // PROD: Upload images to Cloudinary before the transaction so failed uploads never leave partial DB state behind.
            $storedImages = $this->storeUploadedImages($request->file('images', []));

            DB::transaction(function () use ($validated, $slug, $storedImages): void {
                $product = Product::create([
                    'name' => $validated['name'],
                    'slug' => $slug,
                    'category_id' => $validated['category_id'],
                    'description' => $validated['description'] ?? null,
                    'price' => $validated['price'],
                ]);

                foreach ($storedImages as $storedImage) {
                    $product->images()->create([
                        'path' => $storedImage['path'],
                        'cloudinary_public_id' => $storedImage['cloudinary_public_id'],
                    ]);
                }
            });
        } catch (Throwable $exception) {
            $this->cleanupStoredImages($storedImages);
            report($exception);

            return redirect()
                ->back()
                ->withErrors([
                    'images' => 'Impossible d enregistrer le produit pour le moment. Veuillez reessayer.',
                ])
                ->withInput();
        }

        return redirect()->route('admin.products.index')->with('success', 'Produit ajoute avec succes.');
    }

    /**
     * UPDATE: Afficher le formulaire de modification
     */
    public function edit(Product $product): Response
    {
        $categories = Category::all();
        $product->load('images');

        return Inertia::render('Admin/Products/Edit', [
            'product' => new ProductResource($product),
            'categories' => $categories,
        ]);
    }

    /**
     * UPDATE: Mettre a jour un produit
     */
    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            // FIX: Cap newly uploaded images at five files per request.
            'images' => 'nullable|array|max:5',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'images_to_delete' => 'nullable|array',
            'images_to_delete.*' => 'integer|exists:product_images,id',
        ]);

        $slug = Str::slug($validated['name']);

        // FIX: Enforce slug uniqueness while allowing the current product to keep its own slug.
        validator(
            ['slug' => $slug],
            ['slug' => ['required', Rule::unique('products', 'slug')->ignore($product->id)]]
        )->validate();

        $imagesToDelete = array_map('intval', $validated['images_to_delete'] ?? []);
        $newImages = $request->file('images', []);
        $remainingImagesCount = $product->images()->whereNotIn('id', $imagesToDelete)->count();
        $newImagesCount = is_array($newImages) ? count($newImages) : 0;

        // FIX: Prevent a product from exceeding the five-image cap after update.
        if ($remainingImagesCount + $newImagesCount > 5) {
            return redirect()
                ->back()
                ->withErrors([
                    'images' => 'Un produit ne peut pas contenir plus de 5 images.',
                ])
                ->withInput();
        }

        $storedImages = [];

        try {
            // PROD: Upload new assets first so Cloudinary failures abort before the database is changed.
            $storedImages = $this->storeUploadedImages($newImages);

            DB::transaction(function () use ($product, $validated, $slug, $imagesToDelete, $storedImages): void {
                $imagesToDeleteAfterCommit = [];

                $product->update([
                    'name' => $validated['name'],
                    'slug' => $slug,
                    'category_id' => $validated['category_id'],
                    'description' => $validated['description'] ?? null,
                    'price' => $validated['price'],
                ]);

                if ($imagesToDelete !== []) {
                    $images = ProductImage::query()
                        ->where('product_id', $product->id)
                        ->whereIn('id', $imagesToDelete)
                        ->get();

                    $imagesToDeleteAfterCommit = $images
                        ->map(fn (ProductImage $image): array => [
                            'path' => $image->path,
                            'cloudinary_public_id' => $image->cloudinary_public_id,
                        ])
                        ->all();

                    ProductImage::query()
                        ->where('product_id', $product->id)
                        ->whereIn('id', $imagesToDelete)
                        ->delete();
                }

                foreach ($storedImages as $storedImage) {
                    $product->images()->create([
                        'path' => $storedImage['path'],
                        'cloudinary_public_id' => $storedImage['cloudinary_public_id'],
                    ]);
                }

                // PROD: Remove replaced Cloudinary assets only after the transaction commits successfully.
                DB::afterCommit(function () use ($imagesToDeleteAfterCommit): void {
                    $this->cleanupStoredImages($imagesToDeleteAfterCommit);
                });
            });
        } catch (Throwable $exception) {
            $this->cleanupStoredImages($storedImages);
            report($exception);

            return redirect()
                ->back()
                ->withErrors([
                    'images' => 'Impossible de mettre a jour le produit pour le moment. Veuillez reessayer.',
                ])
                ->withInput();
        }

        return redirect()->route('admin.products.index')->with('success', 'Produit modifie avec succes.');
    }

    /**
     * DELETE: Supprimer un produit
     */
    public function destroy(Product $product): RedirectResponse
    {
        $storedImages = $product->images()
            ->get(['path', 'cloudinary_public_id'])
            ->map(fn (ProductImage $image): array => [
                'path' => $image->path,
                'cloudinary_public_id' => $image->cloudinary_public_id,
            ])
            ->all();

        try {
            // PROD: Remove the product atomically and delete remote assets only after a committed transaction.
            DB::transaction(function () use ($product, $storedImages): void {
                $product->delete();

                DB::afterCommit(function () use ($storedImages): void {
                    $this->cleanupStoredImages($storedImages);
                });
            });
        } catch (Throwable $exception) {
            report($exception);

            return redirect()
                ->back()
                ->withErrors([
                    'product' => 'Impossible de supprimer le produit pour le moment. Veuillez reessayer.',
                ]);
        }

        return redirect()->route('admin.products.index')->with('success', 'Produit supprime avec succes.');
    }

    /**
     * Upload product images to Cloudinary and return their durable metadata.
     *
     * @param  array<int, \Illuminate\Http\UploadedFile>|null  $images
     * @return array<int, array{path: string, cloudinary_public_id: string}>
     */
    protected function storeUploadedImages(?array $images): array
    {
        $storedImages = [];

        foreach ($images ?? [] as $image) {
            $uploadedImage = Cloudinary::upload($image->getRealPath(), [
                'folder' => 'suztech/products',
            ]);

            $path = $uploadedImage->getSecurePath();
            $publicId = $uploadedImage->getPublicId();

            // PROD: Fail fast when Cloudinary does not return the durable identifiers required for cleanup.
            if (! is_string($path) || $path === '' || ! is_string($publicId) || $publicId === '') {
                throw new RuntimeException('Cloudinary product image upload failed.');
            }

            $storedImages[] = [
                'path' => $path,
                'cloudinary_public_id' => $publicId,
            ];
        }

        return $storedImages;
    }

    /**
     * Delete uploaded Cloudinary assets without breaking the request if an asset is already gone.
     *
     * @param  array<int, array{path?: string|null, cloudinary_public_id?: string|null}>  $images
     */
    protected function cleanupStoredImages(array $images): void
    {
        foreach ($images as $image) {
            $publicId = $image['cloudinary_public_id'] ?? null;

            if (! is_string($publicId) || $publicId === '') {
                continue;
            }

            try {
                // PROD: Destroy the remote asset by its public ID so product images survive redeploys but still clean up on delete.
                Cloudinary::destroy($publicId);
            } catch (Throwable $exception) {
                report($exception);
            }
        }
    }
}
