<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // PERF: Optimize category product listings and related-product lookups ordered by recency.
            $table->index(['category_id', 'created_at'], 'products_category_created_at_index');
        });

        Schema::table('comments', function (Blueprint $table) {
            // PERF: Optimize product comment retrieval and moderation views ordered by recency.
            $table->index(['product_id', 'created_at'], 'comments_product_created_at_index');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex('products_category_created_at_index');
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->dropIndex('comments_product_created_at_index');
        });
    }
};
