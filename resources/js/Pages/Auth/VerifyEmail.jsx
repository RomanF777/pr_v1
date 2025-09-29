import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Подтверждение email - StudyPro" />

            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                    Подтверждение email
                </h2>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <p className="text-blue-800 text-center">
                    Спасибо за регистрацию! Прежде чем начать, подтвердите ваш email адрес, 
                    перейдя по ссылке в письме, которое мы вам отправили. 
                    Если вы не получили письмо, мы отправим его еще раз.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                    <p className="text-green-700 text-center font-medium">
                        Новая ссылка для подтверждения отправлена на ваш email адрес.
                    </p>
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <PrimaryButton 
                    disabled={processing}
                    className="w-full justify-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 py-3"
                >
                    {processing ? 'Отправка...' : 'Отправить ссылку еще раз'}
                </PrimaryButton>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="w-full block text-center text-blue-600 hover:text-blue-800 font-medium transition duration-200 py-3"
                >
                    Выйти из аккаунта
                </Link>
            </form>
        </GuestLayout>
    );
}