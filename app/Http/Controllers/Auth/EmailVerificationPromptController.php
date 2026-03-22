<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        // PERF: Keep this verification route controller-based so route:cache can be generated in production images.
        return $request->user()->hasVerifiedEmail()
            ? redirect()->route($request->user()->is_admin ? 'admin.dashboard' : 'home')
            : Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
    }
}
