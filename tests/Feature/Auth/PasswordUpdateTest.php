<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

test('legacy password update endpoint is not exposed in the custom auth flow', function () {
    $user = User::factory()->create();
    $originalPasswordHash = $user->password;

    $response = $this->actingAs($user)->put('/password', [
        'current_password' => 'password',
        'password' => 'NewPassword123!',
        'password_confirmation' => 'NewPassword123!',
    ]);

    $response->assertNotFound();
    expect($user->fresh()->password)->toBe($originalPasswordHash);
    expect(Hash::check('password', $user->fresh()->password))->toBeTrue();
});
