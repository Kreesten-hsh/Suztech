<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    // PERF: Use controller actions instead of route closures so Laravel route caching stays compatible.
    public function about(): Response
    {
        return Inertia::render('About');
    }

    // PERF: Use controller actions instead of route closures so Laravel route caching stays compatible.
    public function services(): Response
    {
        return Inertia::render('Services');
    }

    // PERF: Use controller actions instead of route closures so Laravel route caching stays compatible.
    public function contact(): Response
    {
        return Inertia::render('Contact');
    }
}
