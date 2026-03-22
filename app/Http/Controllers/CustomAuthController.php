<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CustomAuthController extends Controller
{
    /**
     * Display the login view.
     */
    public function createLogin(Request $request): Response|RedirectResponse
    {
        // FIX: Allow administrators to jump straight back into the back office while
        // invalidating stale non-admin sessions created before the admin-only login flow.
        if (Auth::check()) {
            if ($request->user()?->is_admin) {
                return redirect()->route('admin.products.index');
            }

            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        return Inertia::render('Auth/MyLogin');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function storeLogin(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $request->session()->regenerate();

        // FIX: Restore the historical admin post-login destination for the back-office flow.
        return redirect()->intended(route('admin.products.index'));
    }

    /**
     * Block public registration and send visitors back to the admin login.
     */
    public function disabledRegister(Request $request): RedirectResponse
    {
        return redirect()
            ->route('login')
            ->with('error', 'L inscription publique est desactivee. Seul l administrateur peut acceder au dashboard.');
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
