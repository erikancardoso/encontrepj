<?php

namespace Database\Seeders;

use App\Enums\AccountType;
use App\Models\Organization;
use App\Models\OrganizationMembership;
use App\Models\ProfessionalProfile;
use App\Models\User;
use App\Models\UserAccountType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $password = Hash::make('EncontrePJ@123');

        $professional = $this->createUser(
            'Prestador Teste',
            'prestador@encontrepj.test',
            AccountType::Professional,
            $password,
        );

        ProfessionalProfile::query()->updateOrCreate(
            ['user_id' => $professional->id],
            [
                'profile_kind' => AccountType::Professional->value,
                'headline' => 'Desenvolvedor de sistemas',
                'verification_status' => 'verified',
                'onboarding_completed_at' => now(),
            ],
        );

        $companyUser = $this->createUser(
            'Fornecedor Teste',
            'fornecedor@encontrepj.test',
            AccountType::Company,
            $password,
        );

        $organization = Organization::query()->updateOrCreate(
            ['owner_user_id' => $companyUser->id],
            [
                'type' => 'contracting_company',
                'legal_name' => 'Empresa Fornecedora Teste Ltda.',
                'trade_name' => 'Fornecedor Teste',
                'tax_id' => null,
                'verification_status' => 'verified',
            ],
        );

        OrganizationMembership::query()->updateOrCreate(
            [
                'organization_id' => $organization->id,
                'user_id' => $companyUser->id,
            ],
            [
                'role' => 'owner',
                'can_sign' => true,
                'status' => 'active',
            ],
        );

        $recruiter = $this->createUser(
            'Recrutador Teste',
            'recrutador@encontrepj.test',
            AccountType::Recruiter,
            $password,
        );

        ProfessionalProfile::query()->updateOrCreate(
            ['user_id' => $recruiter->id],
            [
                'profile_kind' => AccountType::Recruiter->value,
                'headline' => 'Especialista em recrutamento técnico',
                'verification_status' => 'verified',
                'onboarding_completed_at' => now(),
            ],
        );

        $this->createUser(
            'Administrador Teste',
            'admin@encontrepj.test',
            AccountType::Administrator,
            $password,
        );
    }

    private function createUser(
        string $name,
        string $email,
        AccountType $accountType,
        string $password,
    ): User {
        $user = User::query()->updateOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'email_verified_at' => now(),
                'password' => $password,
            ],
        );

        UserAccountType::query()->updateOrCreate(
            [
                'user_id' => $user->id,
                'type' => $accountType->value,
            ],
            ['is_primary' => true],
        );

        return $user;
    }
}
