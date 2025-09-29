<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CreateAdmin extends Command
{
    protected $signature = 'make:admin';
    protected $description = 'Create an administrator user';

    public function handle()
    {
        $this->info('Создание администратора...');

        $name = $this->ask('Имя администратора');
        $email = $this->ask('Email администратора');
        $password = $this->secret('Пароль администратора');

        // Валидация
        $validator = Validator::make([
            'name' => $name,
            'email' => $email,
            'password' => $password,
        ], [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }
            return 1;
        }

        // Создание администратора
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'is_admin' => true,
            'email_verified_at' => now(),
        ]);

        $this->info('✅ Администратор успешно создан!');
        $this->info("Имя: {$user->name}");
        $this->info("Email: {$user->email}");
        $this->info("ID: {$user->id}");

        return 0;
    }
}