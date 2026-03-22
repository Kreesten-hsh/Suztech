<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse
    {
        // PERF: Keep this verification route controller-based so route:cache can be generated in production images.
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->route($request->user()->is_admin ? 'admin.dashboard' : 'home');
        }

        $request->user()->sendEmailVerificationNotification();

        return redirect()
            ->route('verification.notice')
            ->with('status', 'verification-link-sent');
    }
}
