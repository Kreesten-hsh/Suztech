<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Admin
{
    /**
     * Gère une requête entrante.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Vérifiez si l'utilisateur est authentifié ET si son rôle est 'admin'.
        // Assurez-vous d'avoir une colonne 'is_admin' ou un système de rôle similaire dans votre base de données.
        if (auth()->check() && auth()->user()->is_admin) {
            return $next($request);
        }

        // Si l'utilisateur n'est pas un admin, redirigez-le.
        return redirect('/')->with('error', 'Accès refusé. Seuls les administrateurs peuvent accéder à cette page.');
    }
}
