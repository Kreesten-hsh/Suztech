<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class CustomAuthController extends Controller
{
    /**
     * Display the login view.
     */
    public function createLogin(): Response
    {
        return Inertia::render('Auth/MyLogin');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function storeLogin(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        $user = $request->user();

        // FIX: Redirect non-admin users to the public home page instead of an admin-only route.
        if ($user && $user->is_admin) {
            return redirect()->route('admin.dashboard');
        }

        return redirect()->route('home');
    }

    /**
     * Display the registration view.
     */
    public function createRegister(): Response
    {
        return Inertia::render('Auth/MyRegister');
    }

    /**
     * Handle a registration request.
     */
    public function storeRegister(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // FIX: Dispatch the Registered event so Laravel sends the email verification notification.
        event(new Registered($user));

        Auth::login($user);

        // FIX: Send newly registered users to the public home page with a welcome flash message.
        return redirect()
            ->route('home')
            ->with('success', 'Bienvenue sur SUZTECH. Verifiez votre adresse e-mail pour activer toutes les fonctionnalites.');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
