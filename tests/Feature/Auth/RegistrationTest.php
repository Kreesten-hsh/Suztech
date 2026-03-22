<?php

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Event;

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('new users can register through the custom registration route', function () {
    Event::fake([Registered::class]);

    $response = $this->post(route('register'), [
        'name' => 'Aimee Hounkpe',
        'email' => 'aimee@example.com',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
    ]);

    $user = User::query()->where('email', 'aimee@example.com')->first();

    expect($user)->not->toBeNull();
    expect($user->email_verified_at)->toBeNull();

    Event::assertDispatched(Registered::class);
    $this->assertAuthenticatedAs($user);
    $response->assertRedirect(route('home', absolute: false));
    $response->assertSessionHas('success');
    $this->assertDatabaseHas('users', [
        'email' => 'aimee@example.com',
        'name' => 'Aimee Hounkpe',
    ]);
});
