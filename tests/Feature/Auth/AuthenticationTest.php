<?php

use App\Models\User;

test('login screen can be rendered', function () {
    $response = $this->get(route('login'));

    $response->assertOk();
});

test('authenticated admins visiting login are redirected to the admin products index', function () {
    $admin = User::factory()->admin()->create();

    $response = $this->actingAs($admin)->get(route('login'));

    $response->assertRedirect(route('admin.products.index', absolute: false));
});

test('authenticated non admin users visiting login are logged out and shown the login screen', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('login'));

    $response->assertOk();
    $this->assertGuest();
});

test('non admin users can not authenticate through the admin-only login route', function () {
    $user = User::factory()->create();

    $response = $this->from(route('login'))->post(route('login'), [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertGuest();
    $response->assertSessionHasErrors('email');
    $response->assertRedirect(route('login', absolute: false));
});

test('admin users are redirected to the admin products index after login', function () {
    $admin = User::factory()->admin()->create();

    $response = $this->post(route('login'), [
        'email' => $admin->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticatedAs($admin);
    $response->assertRedirect(route('admin.products.index', absolute: false));
});

test('users can not authenticate with an invalid password', function () {
    $user = User::factory()->create();

    $response = $this->from(route('login'))->post(route('login'), [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
    $response->assertSessionHasErrors('email');
    $response->assertRedirect(route('login', absolute: false));
});

test('authenticated users can logout', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('logout'));

    $this->assertGuest();
    $response->assertRedirect('/');
});
