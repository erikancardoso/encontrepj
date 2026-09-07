<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_account_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('type', 32);
            $table->boolean('is_primary')->default(false);
            $table->timestamps();
            $table->unique(['user_id', 'type']);
            $table->index(['type', 'is_primary']);
        });

        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_user_id')->constrained('users')->cascadeOnDelete();
            $table->string('type', 32);
            $table->string('legal_name')->nullable();
            $table->string('trade_name');
            $table->string('tax_id', 14)->nullable()->unique();
            $table->string('verification_status', 32)->default('pending');
            $table->timestamps();
            $table->index(['type', 'verification_status']);
        });

        Schema::create('organization_memberships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('role', 32)->default('member');
            $table->boolean('can_sign')->default(false);
            $table->string('status', 32)->default('pending');
            $table->timestamps();
            $table->unique(['organization_id', 'user_id']);
        });

        Schema::create('professional_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('profile_kind', 32);
            $table->string('headline')->nullable();
            $table->string('verification_status', 32)->default('pending');
            $table->timestamp('onboarding_completed_at')->nullable();
            $table->timestamps();
            $table->index(['profile_kind', 'verification_status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('professional_profiles');
        Schema::dropIfExists('organization_memberships');
        Schema::dropIfExists('organizations');
        Schema::dropIfExists('user_account_types');
    }
};
