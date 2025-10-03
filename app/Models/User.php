<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
        'is_admin',
        'license_key',
        'subscription_start',
        'subscription_end', 
        'is_active',
        'stripe_customer_id',
        'stripe_subscription_id'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
            'is_active' => 'boolean',
            'subscription_start' => 'datetime',
            'subscription_end' => 'datetime',
        ];
    }

    /**
     * Определяем, верифицирован ли email
     * Для Google пользователей email считается верифицированным автоматически
     */
    public function hasVerifiedEmail(): bool
    {
        // Если пользователь через Google или email уже верифицирован
        return !is_null($this->email_verified_at) || !is_null($this->google_id);
    }

    /**
     * Пометить email как верифицированный
     */
    public function markEmailAsVerified(): bool
    {
        return $this->forceFill([
            'email_verified_at' => $this->freshTimestamp(),
        ])->save();
    }

    /**
     * Отправить уведомление о верификации email
     * Для Google пользователей пропускаем отправку
     */
    public function sendEmailVerificationNotification(): void
    {
        // Отправляем верификацию только если пользователь НЕ через Google
        if (is_null($this->google_id)) {
            $this->notify(new \Illuminate\Auth\Notifications\VerifyEmail);
        }
        // Для Google пользователей ничего не делаем
    }

    public function isAdmin(): bool
    {
        return $this->is_admin === true;
    }

        /**
     * Проверяет активна ли подписка
     */
    public function hasActiveSubscription(): bool
    {
        return $this->is_active && 
               $this->subscription_end && 
               $this->subscription_end->isFuture();
    }

    /**
     * Генерирует лицензионный ключ
     */
    public function generateLicenseKey(): string
    {
        return 'STUDYPRO-' . strtoupper(Str::random(16));
    }

    /**
     * Активирует подписку
     */
    public function activateSubscription(int $months = 1): void
    {
        $this->update([
            'license_key' => $this->license_key ?: $this->generateLicenseKey(),
            'subscription_start' => now(),
            'subscription_end' => now()->addMonths($months),
            'is_active' => true,
        ]);
    }

    /**
     * Деактивирует подписку
     */
    public function deactivateSubscription(): void
    {
        $this->update([
            'is_active' => false,
        ]);
    }

    /**
     * Получает оставшееся время подписки
     */
    public function getRemainingSubscriptionDays(): int
    {
        if (!$this->subscription_end) {
            return 0;
        }
        
        return max(0, now()->diffInDays($this->subscription_end, false));
    }

        public function scopeWithSubscriptionStatus($query)
    {
        return $query->addSelect(['*',
            \DB::raw('CASE 
                WHEN is_active = 1 AND subscription_end > NOW() THEN "active"
                WHEN is_active = 1 AND subscription_end <= NOW() THEN "expired" 
                ELSE "inactive"
            END as subscription_status'),
            \DB::raw('DATEDIFF(subscription_end, NOW()) as days_remaining')
        ]);
    }

    /**
     * Scope для активных подписок
     */
    public function scopeActiveSubscriptions($query)
    {
        return $query->where('is_active', true)
                    ->where('subscription_end', '>', now());
    }

    /**
     * Scope для истекающих подписок
     */
    public function scopeExpiringSubscriptions($query, $days = 7)
    {
        return $query->where('is_active', true)
                    ->where('subscription_end', '>', now())
                    ->where('subscription_end', '<=', now()->addDays($days));
    }

    public function getIsVerifiedAttribute(): bool
    {
        return !is_null($this->email_verified_at) || !is_null($this->google_id);
    }

        /**
     * Получает тип верификации
     */
    public function getVerificationTypeAttribute(): string
    {
        if (!is_null($this->google_id)) {
            return 'google';
        }
        return !is_null($this->email_verified_at) ? 'email' : 'none';
    }
}