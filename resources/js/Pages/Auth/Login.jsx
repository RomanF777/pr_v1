import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Вход - StudyPro" />

            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v6l9-5M12 20l-9-5" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-blue-900">
                        С возвращением!
                    </h2>
                    <p className="mt-2 text-blue-700">
                        Продолжайте своё обучение
                    </p>
                </div>

                {status && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-lg">
                    <div>
                        <InputLabel htmlFor="email" value="Email" className="text-blue-900 font-medium" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-2 block w-full rounded-lg border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                            autoComplete="email"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Пароль" className="text-blue-900 font-medium" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-2 block w-full rounded-lg border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-1" />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="text-blue-600 focus:ring-blue-500 border-blue-300"
                            />
                            <span className="ms-2 text-sm text-blue-700">
                                Запомнить меня
                            </span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition duration-200"
                            >
                                Забыли пароль?
                            </Link>
                        )}
                    </div>

                    <div className="space-y-4">
                        <PrimaryButton 
                            className="w-full justify-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 py-3 rounded-lg font-bold text-white transition duration-200"
                            disabled={processing}
                        >
                            {processing ? 'Вход...' : 'Войти в аккаунт'}
                        </PrimaryButton>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-blue-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-blue-600">или</span>
                            </div>
                        </div>

                        <a
                            href="/auth/google"
                            className="w-full flex items-center justify-center gap-3 bg-white border border-blue-200 text-blue-700 px-4 py-3 rounded-lg font-medium hover:bg-blue-50 transition duration-200"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Войти с Google
                        </a>
                    </div>

                    <div className="text-center">
                        <p className="text-blue-700">
                            Нет аккаунта?{' '}
                            <Link
                                href={route('register')}
                                className="font-bold text-blue-600 hover:text-blue-800 transition duration-200"
                            >
                                Зарегистрироваться
                            </Link>
                        </p>
                    </div>
                </form>

                <div className="text-center text-blue-600 text-sm">
                    Первые 7 дней бесплатно для всех новых пользователей
                </div>
            </div>
        </div>
        </GuestLayout>
    );
}