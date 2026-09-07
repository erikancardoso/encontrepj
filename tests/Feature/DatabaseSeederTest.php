<?php

use App\Enums\AccountType;
use App\Models\Organization;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('the demo users are created with their primary account types', function () {
    $this->seed(DatabaseSeeder::class);

    $accounts = [
        'prestador@encontrepj.test' => AccountType::Professional,
        'fornecedor@encontrepj.test' => AccountType::Company,
        'recrutador@encontrepj.test' => AccountType::Recruiter,
        'admin@encontrepj.test' => AccountType::Administrator,
    ];

    foreach ($accounts as $email => $accountType) {
        $user = User::query()->where('email', $email)->firstOrFail();

        expect($user->accountTypes()->where('type', $accountType->value)->where('is_primary', true)->exists())
            ->toBeTrue();
    }
});

test('the demo company representative can sign for a verified organization', function () {
    $this->seed(DatabaseSeeder::class);

    $organization = Organization::query()->where('trade_name', 'Fornecedor Teste')->firstOrFail();

    expect($organization->verification_status)->toBe('verified')
        ->and($organization->memberships()->where('role', 'owner')->where('can_sign', true)->exists())
        ->toBeTrue();
});

test('each demo user can access the dashboard for its account type', function (string $email, AccountType $accountType) {
    $this->seed(DatabaseSeeder::class);

    $user = User::query()->where('email', $email)->firstOrFail();

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->where('auth.user.primary_account_type', $accountType->value));
})->with([
    'prestador' => ['prestador@encontrepj.test', AccountType::Professional],
    'empresa' => ['fornecedor@encontrepj.test', AccountType::Company],
    'recrutador' => ['recrutador@encontrepj.test', AccountType::Recruiter],
    'administrador' => ['admin@encontrepj.test', AccountType::Administrator],
]);
