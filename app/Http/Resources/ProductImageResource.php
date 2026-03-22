<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductImageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            // PROD: Keep legacy local images working while Cloudinary-backed rows expose their durable remote URL.
            'url' => str_starts_with($this->path, 'http://') || str_starts_with($this->path, 'https://')
                ? $this->path
                : url('storage/' . $this->path),
        ];
    }
}
