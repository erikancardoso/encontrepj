<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['user_id', 'profile_kind', 'headline', 'verification_status', 'onboarding_completed_at'])]
class ProfessionalProfile extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return ['onboarding_completed_at' => 'datetime'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
