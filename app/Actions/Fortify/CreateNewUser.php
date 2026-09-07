<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Enums\AccountType;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
            'account_type' => ['required', Rule::enum(AccountType::class)->only(AccountType::selfRegistrable())],
            'company_name' => ['nullable', 'required_if:account_type,company', 'string', 'max:255'],
        ])->validate();

        return DB::transaction(function () use ($input): User {
            $user = User::create([
                'name' => $input['name'],
                'email' => $input['email'],
                'password' => $input['password'],
            ]);

            $accountType = AccountType::from($input['account_type']);

            $user->accountTypes()->create([
                'type' => $accountType,
                'is_primary' => true,
            ]);

            if ($accountType === AccountType::Company) {
                $organization = $user->ownedOrganizations()->create([
                    'type' => 'contracting_company',
                    'trade_name' => $input['company_name'],
                ]);

                $organization->memberships()->create([
                    'user_id' => $user->id,
                    'role' => 'owner',
                    'can_sign' => false,
                    'status' => 'pending',
                ]);
            } else {
                $user->professionalProfile()->create([
                    'profile_kind' => $accountType->value,
                ]);
            }

            return $user;
        });
    }
}
