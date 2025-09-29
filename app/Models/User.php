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
}