<?php

namespace Tests\Feature\Auth;

use App\Enums\AccountType;
use App\Models\Organization;
use App\Models\ProfessionalProfile;
use App\Models\UserAccountType;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Fortify\Features;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->skipUnlessFortifyHas(Features::registration());
    }

    public function test_registration_screen_can_be_rendered()
    {
        $response = $this->get(route('register'));

        $response->assertOk();
    }

    public function test_new_users_can_register()
    {
        $response = $this->post(route('register.store'), [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'account_type' => AccountType::Professional->value,
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
        $this->assertDatabaseHas(UserAccountType::class, [
            'type' => AccountType::Professional->value,
            'is_primary' => true,
        ]);
        $this->assertDatabaseHas(ProfessionalProfile::class, [
            'profile_kind' => AccountType::Professional->value,
        ]);
    }

    public function test_company_registration_creates_a_pending_organization(): void
    {
        $this->post(route('register.store'), [
            'name' => 'Company Owner',
            'email' => 'owner@example.com',
            'account_type' => AccountType::Company->value,
            'company_name' => 'Empresa Exemplo',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])->assertRedirect(route('dashboard', absolute: false));

        $this->assertDatabaseHas(Organization::class, [
            'trade_name' => 'Empresa Exemplo',
            'type' => 'contracting_company',
            'verification_status' => 'pending',
        ]);
        $this->assertDatabaseHas('organization_memberships', [
            'role' => 'owner',
            'can_sign' => false,
            'status' => 'pending',
        ]);
    }

    public function test_administrator_account_cannot_be_self_selected(): void
    {
        $this->post(route('register.store'), [
            'name' => 'Unexpected Admin',
            'email' => 'admin@example.com',
            'account_type' => AccountType::Administrator->value,
            'password' => 'password',
            'password_confirmation' => 'password',
        ])->assertSessionHasErrors('account_type');

        $this->assertGuest();
    }
}
