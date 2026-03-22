<?php

use App\Models\User;

test('registration screen redirects back to login because public signup is disabled', function () {
    $response = $this->get(route('register'));

    $response->assertRedirect(route('login', absolute: false));
    $response->assertSessionHas('error');
});

test('public registration can not create a new user', function () {
    $response = $this->post(route('register'), [
        'name' => 'Aimee Hounkpe',
        'email' => 'aimee@example.com',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
    ]);

    $this->assertGuest();
    $response->assertRedirect(route('login', absolute: false));
    $response->assertSessionHas('error');
    $this->assertDatabaseMissing('users', [
        'email' => 'aimee@example.com',
    ]);
});
