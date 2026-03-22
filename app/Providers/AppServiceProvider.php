<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->clearStaleViteHotFile();

        Vite::prefetch(concurrency: 3);

        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }
    }

    /**
     * Remove a stale Vite hot file in local development when the dev server is no longer reachable.
     */
    protected function clearStaleViteHotFile(): void
    {
        if (! app()->environment('local')) {
            return;
        }

        $hotFile = public_path('hot');

        if (! is_file($hotFile)) {
            return;
        }

        $hotUrl = trim((string) @file_get_contents($hotFile));

        if ($hotUrl === '') {
            @unlink($hotFile);

            return;
        }

        $host = trim((string) parse_url($hotUrl, PHP_URL_HOST), '[]');
        $port = (int) (parse_url($hotUrl, PHP_URL_PORT) ?: 5173);

        if ($host === '') {
            @unlink($hotFile);

            return;
        }

        $connection = @fsockopen($host, $port, $errorCode, $errorMessage, 0.5);

        if ($connection === false) {
            // FIX: Fall back to built assets when Vite left a stale hot file behind.
            @unlink($hotFile);

            return;
        }

        fclose($connection);
    }
}
