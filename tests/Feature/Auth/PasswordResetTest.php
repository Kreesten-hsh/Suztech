<?php

test('forgot password screen is not exposed in the custom auth flow', function () {
    $this->get('/forgot-password')->assertNotFound();
});

test('forgot password form submissions are not exposed in the custom auth flow', function () {
    $this->post('/forgot-password', ['email' => 'user@example.com'])->assertNotFound();
});

test('password reset screen is not exposed in the custom auth flow', function () {
    $this->get('/reset-password/example-token')->assertNotFound();
});

test('password reset submissions are not exposed in the custom auth flow', function () {
    $this->post('/reset-password', [
        'token' => 'example-token',
        'email' => 'user@example.com',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
    ])->assertNotFound();
});
