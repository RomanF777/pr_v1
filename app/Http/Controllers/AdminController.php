<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'total_users' => User::count(),
            'verified_users' => User::whereNotNull('email_verified_at')
                                ->orWhereNotNull('google_id')
                                ->count(), // Считаем и email и Google верификацию
            'google_users' => User::whereNotNull('google_id')->count(),
            'admin_users' => User::where('is_admin', true)->count(),
        ];

        $recent_users = User::latest()->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_users' => $recent_users,
        ]);
    }

    public function users()
    {
        $users = User::latest()->paginate(10);

        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }
}