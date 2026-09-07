<?php

namespace Tests\Feature;

use App\Enums\AccountType;
use App\Models\User;
use App\Models\UserAccountType;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get(route('dashboard'));
        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_visit_the_dashboard()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $response = $this->get(route('dashboard'));
        $response->assertOk();
    }

    public function test_company_users_can_visit_the_company_settings_page()
    {
        $user = User::factory()->create();
        UserAccountType::query()->create([
            'user_id' => $user->id,
            'type' => AccountType::Company,
            'is_primary' => true,
        ]);

        $this->actingAs($user)
            ->get(route('company.settings'))
            ->assertOk();
    }

    public function test_professionals_cannot_visit_the_company_settings_page()
    {
        $user = User::factory()->create();
        UserAccountType::query()->create([
            'user_id' => $user->id,
            'type' => AccountType::Professional,
            'is_primary' => true,
        ]);

        $this->actingAs($user)
            ->get(route('company.settings'))
            ->assertForbidden();
    }

    public function test_company_users_can_visit_the_contracts_page()
    {
        $user = User::factory()->create();
        UserAccountType::query()->create([
            'user_id' => $user->id,
            'type' => AccountType::Company,
            'is_primary' => true,
        ]);

        $this->actingAs($user)
            ->get(route('company.contracts'))
            ->assertOk();
    }

    public function test_professionals_cannot_visit_the_contracts_page()
    {
        $user = User::factory()->create();
        UserAccountType::query()->create([
            'user_id' => $user->id,
            'type' => AccountType::Professional,
            'is_primary' => true,
        ]);

        $this->actingAs($user)
            ->get(route('company.contracts'))
            ->assertForbidden();
    }

    public function test_company_users_can_visit_the_recruitment_page()
    {
        $user = User::factory()->create();
        UserAccountType::query()->create([
            'user_id' => $user->id,
            'type' => AccountType::Company,
            'is_primary' => true,
        ]);

        $this->actingAs($user)
            ->get(route('company.recruitment'))
            ->assertOk();
    }

    public function test_professionals_cannot_visit_the_recruitment_page()
    {
        $user = User::factory()->create();
        UserAccountType::query()->create([
            'user_id' => $user->id,
            'type' => AccountType::Professional,
            'is_primary' => true,
        ]);

        $this->actingAs($user)
            ->get(route('company.recruitment'))
            ->assertForbidden();
    }

    public function test_company_users_can_visit_the_payments_page()
    {
        $user = User::factory()->create();
        UserAccountType::query()->create([
            'user_id' => $user->id,
            'type' => AccountType::Company,
            'is_primary' => true,
        ]);

        $this->actingAs($user)
            ->get(route('company.payments'))
            ->assertOk();
    }

    public function test_professionals_cannot_visit_the_payments_page()
    {
        $user = User::factory()->create();
        UserAccountType::query()->create([
            'user_id' => $user->id,
            'type' => AccountType::Professional,
            'is_primary' => true,
        ]);

        $this->actingAs($user)
            ->get(route('company.payments'))
            ->assertForbidden();
    }
}
