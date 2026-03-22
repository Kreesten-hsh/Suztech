<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // SECURITY: Use a CSP compatible with Inertia, Ziggy's inline route helper, local Vite HMR,
        // external maps, external images and the hosted Formspree endpoint.
        $response->headers->set('Content-Security-Policy', $this->contentSecurityPolicy());

        // SECURITY: Prevent MIME sniffing and framing of application pages.
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'DENY');

        // SECURITY: Limit referrer leakage and disable unnecessary browser features.
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set(
            'Permissions-Policy',
            'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
        );

        // SECURITY: Enforce HTTPS persistence for production deployments behind Render's TLS edge.
        if (app()->environment('production')) {
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        }

        return $response;
    }

    /**
     * Build a Content-Security-Policy value that supports local Vite HMR during development.
     */
    protected function contentSecurityPolicy(): string
    {
        $scriptSources = ["'self'", "'unsafe-inline'"];
        $styleSources = ["'self'", "'unsafe-inline'", 'https://fonts.bunny.net'];
        $connectSources = ["'self'"];
        $directives = [
            "default-src 'self'",
            "base-uri 'self'",
            "frame-ancestors 'none'",
            "object-src 'none'",
            'form-action \'self\' https://formspree.io',
            'script-src '.implode(' ', $scriptSources),
            'style-src '.implode(' ', $styleSources),
            "img-src 'self' data: blob: https://images.unsplash.com https://placehold.co https://www.google.com https://maps.gstatic.com https://*.googleusercontent.com",
            "font-src 'self' data: https://fonts.bunny.net",
            'connect-src '.implode(' ', $connectSources),
            "frame-src 'self' https://www.google.com https://maps.google.com",
            "worker-src 'self' blob:",
        ];

        if (app()->environment(['local', 'development'])) {
            $scriptSources = array_merge($scriptSources, [
                'http://localhost:5173',
                'http://127.0.0.1:5173',
                'http://[::1]:5173',
            ]);

            $styleSources = array_merge($styleSources, [
                'http://localhost:5173',
                'http://127.0.0.1:5173',
                'http://[::1]:5173',
            ]);

            $connectSources = array_merge($connectSources, [
                'http://localhost:5173',
                'http://127.0.0.1:5173',
                'http://[::1]:5173',
                'ws://localhost:5173',
                'ws://127.0.0.1:5173',
                'ws://[::1]:5173',
            ]);
        } else {
            // SECURITY: Upgrade insecure subresource requests only outside local development to preserve Vite HMR over HTTP.
            $directives[] = "upgrade-insecure-requests";
        }

        $directives[5] = 'script-src '.implode(' ', $scriptSources);
        $directives[6] = 'style-src '.implode(' ', $styleSources);
        $directives[9] = 'connect-src '.implode(' ', $connectSources);

        return implode('; ', $directives);
    }
}
