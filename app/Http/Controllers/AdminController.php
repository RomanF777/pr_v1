<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'total_users' => User::count(),
            'verified_users' => User::where(function($query) {
                                $query->whereNotNull('email_verified_at')
                                      ->orWhereNotNull('google_id');
                            })->count(),
            'google_users' => User::whereNotNull('google_id')->count(),
            'admin_users' => User::where('is_admin', true)->count(),
            'active_subscriptions' => User::where('is_active', true)
                                    ->where('subscription_end', '>', now())
                                    ->count(),
            'expired_subscriptions' => User::where('is_active', true)
                                    ->where('subscription_end', '<=', now())
                                    ->count(),
            'total_revenue' => User::where('is_active', true)->count() * 29.90,
        ];

        $recent_users = User::latest()->take(5)->get()
                        ->map(function($user) {
                            return [
                                'id' => $user->id,
                                'name' => $user->name,
                                'email' => $user->email,
                                'google_id' => $user->google_id,
                                'email_verified_at' => $user->email_verified_at,
                                'is_admin' => $user->is_admin,
                                'is_verified' => $user->is_verified, // используем новый атрибут
                                'verification_type' => $user->verification_type, // используем новый атрибут
                            ];
                        });
        
        $expiring_subscriptions = User::where('is_active', true)
                                ->where('subscription_end', '>', now())
                                ->where('subscription_end', '<=', now()->addDays(7))
                                ->orderBy('subscription_end')
                                ->take(5)
                                ->get()
                                ->map(function($user) {
                                    return [
                                        'id' => $user->id,
                                        'name' => $user->name,
                                        'email' => $user->email,
                                        'subscription_end' => $user->subscription_end,
                                        'days_remaining' => $user->getRemainingSubscriptionDays()
                                    ];
                                });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_users' => $recent_users,
            'expiring_subscriptions' => $expiring_subscriptions,
        ]);
    }

    public function users()
    {
        $users = User::select(['*', 
                        \DB::raw('CASE 
                            WHEN is_active = 1 AND subscription_end > NOW() THEN "active"
                            WHEN is_active = 1 AND subscription_end <= NOW() THEN "expired" 
                            ELSE "inactive"
                        END as subscription_status'),
                        \DB::raw('DATEDIFF(subscription_end, NOW()) as days_remaining'),
                        \DB::raw('CASE 
                            WHEN google_id IS NOT NULL THEN "google"
                            WHEN email_verified_at IS NOT NULL THEN "email" 
                            ELSE "none"
                        END as verification_type')
                    ])
                    ->latest()
                    ->paginate(10);

        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    public function subscriptions()
    {
        $subscriptions = User::select(['*', 
                            \DB::raw('CASE 
                                WHEN is_active = 1 AND subscription_end > NOW() THEN "active"
                                WHEN is_active = 1 AND subscription_end <= NOW() THEN "expired" 
                                ELSE "inactive"
                            END as subscription_status'),
                            \DB::raw('DATEDIFF(subscription_end, NOW()) as days_remaining')
                        ])
                        ->whereNotNull('subscription_start')
                        ->latest('subscription_start')
                        ->paginate(15);

        return Inertia::render('Admin/Subscriptions', [
            'subscriptions' => $subscriptions,
        ]);
    }

    public function updateSubscription(Request $request, User $user)
    {
        $request->validate([
            'action' => 'required|in:activate,deactivate,extend',
            'months' => 'required_if:action,extend|integer|min:1|max:12',
        ]);

        switch ($request->action) {
            case 'activate':
                $user->activateSubscription($request->months ?? 1);
                $message = 'Подписка активирована';
                break;
                
            case 'deactivate':
                $user->deactivateSubscription();
                $message = 'Подписка деактивирована';
                break;
                
            case 'extend':
                $user->activateSubscription($request->months);
                $message = "Подписка продлена на {$request->months} месяцев";
                break;
        }

        return redirect()->back()->with('success', $message);
    }

    public function generateLicenseKey(User $user)
    {
        if (!$user->license_key) {
            $user->update([
                'license_key' => $user->generateLicenseKey(),
            ]);
        }

        return redirect()->back()->with('success', 'Лицензионный ключ сгенерирован');
    }
}