<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // REMOVED: Never seed a trivial default user account in production containers.
        if (app()->environment('local', 'testing')) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);
        }

        // REMOVED: Production admin bootstrap must be a deliberate manual action.
        // Create the first admin with:
        // php artisan tinker
        // User::create(['name' => 'Admin', 'email' => 'admin@example.com', 'password' => bcrypt('change-me-now'), 'is_admin' => true]);
    }
}
