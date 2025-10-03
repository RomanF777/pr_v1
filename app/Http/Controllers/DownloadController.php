<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class DownloadController extends Controller
{
    public function download()
    {
        $user = Auth::user();

        if (!$user->hasActiveSubscription()) {
            return redirect()->route('dashboard')
                ->with('error', 'У вас нет активной подписки для скачивания программы.');
        }

        // Логируем скачивание
        \Log::info('User downloaded program', [
            'user_id' => $user->id,
            'license_key' => $user->license_key
        ]);

        // Путь к файлу программы
        $filePath = 'downloads/StudyProAI-Setup.exe'; // или .dmg для Mac

        if (!Storage::exists($filePath)) {
            return redirect()->route('dashboard')
                ->with('error', 'Файл программы временно недоступен. Попробуйте позже.');
        }

        // Отдаем файл для скачивания
        return Storage::download($filePath, 'StudyProAI-Setup.exe', [
            'Content-Type' => 'application/octet-stream',
        ]);
    }

    public function getLicense()
    {
        $user = Auth::user();

        if (!$user->hasActiveSubscription()) {
            return response()->json([
                'error' => 'No active subscription'
            ], 403);
        }

        return response()->json([
            'license_key' => $user->license_key,
            'subscription_end' => $user->subscription_end->toDateString(),
            'remaining_days' => $user->getRemainingSubscriptionDays()
        ]);
    }
}