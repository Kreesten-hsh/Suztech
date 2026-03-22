<?php

use App\Models\User;

test('password confirmation screen is not exposed in the custom auth flow', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->get('/confirm-password')->assertNotFound();
});

test('password confirmation submissions are not exposed in the custom auth flow', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->post('/confirm-password', [
        'password' => 'password',
    ])->assertNotFound();
});
