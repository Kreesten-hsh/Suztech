<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        // PERF: Keep this verification route controller-based so route:cache can be generated in production images.
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()
                ->route($request->user()->is_admin ? 'admin.dashboard' : 'home')
                ->with('success', 'Votre adresse e-mail a ete verifiee avec succes.');
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return redirect()
            ->route($request->user()->is_admin ? 'admin.dashboard' : 'home')
            ->with('success', 'Votre adresse e-mail a ete verifiee avec succes.');
    }
}
