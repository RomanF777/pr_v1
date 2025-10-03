<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\WebhookController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\GoogleAuthController;

// Главная страница
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Защищённая страница (только авторизованные и верифицированные)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Профиль
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ==== GOOGLE AUTH ====

// Редирект на Google
Route::get('/auth/google', function () {
    return Socialite::driver('google')->redirect();
})->name('google.login');

// Callback от Google
Route::get('/auth/google/callback', function () {
    try {
        $googleUser = Socialite::driver('google')->stateless()->user();

        if (!$googleUser->getEmail()) {
            return redirect('/login')->withErrors([
                'email' => 'Google аккаунт не имеет публичного e-mail.',
            ]);
        }

        $user = User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName() ?? $googleUser->getNickname() ?? explode('@', $googleUser->getEmail())[0],
                'google_id' => $googleUser->getId(),
                'password' => bcrypt(Str::random(16)),
                'email_verified_at' => now(), // ✅ Важно: устанавливаем время верификации
            ]
        );

        Auth::login($user, true);

        return redirect()->intended('/dashboard');

    } catch (\Exception $e) {
        \Log::error('Google auth error: ' . $e->getMessage());
        return redirect('/login')->withErrors([
            'email' => 'Ошибка авторизации через Google. Попробуйте еще раз.',
        ]);
    }
});

// Fallback route для 404 ошибок
Route::fallback(function () {
    return Inertia::render('Errors/NotFound', [
        'status' => 404
    ]);
});

// Админка
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/users', [AdminController::class, 'users'])->name('admin.users');
});

Route::middleware(['auth'])->group(function () {
    Route::post('/create-payment-intent', [StripeController::class, 'createPaymentIntent']);
});

Route::middleware(['auth'])->group(function () {
    Route::post('/create-payment-intent', [StripeController::class, 'createPaymentIntent']);
    Route::get('/download', [DownloadController::class, 'download'])->name('download');
    Route::get('/api/license', [DownloadController::class, 'getLicense']);
});

// Вебхук для Stripe (без CSRF защиты)
Route::post('/stripe/webhook', [StripeController::class, 'handleWebhook']);

Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/users', [AdminController::class, 'users'])->name('admin.users');
    Route::get('/subscriptions', [AdminController::class, 'subscriptions'])->name('admin.subscriptions');
    Route::post('/users/{user}/subscription', [AdminController::class, 'updateSubscription'])->name('admin.users.subscription');
    Route::post('/users/{user}/license', [AdminController::class, 'generateLicenseKey'])->name('admin.users.license');
});

require __DIR__.'/auth.php';