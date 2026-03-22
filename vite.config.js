import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    // FIX: Generate relative asset URLs so the built app works from both
    // `php artisan serve` and XAMPP subdirectory URLs like `/Suztech/Suztech/public`.
    base: './',
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});
