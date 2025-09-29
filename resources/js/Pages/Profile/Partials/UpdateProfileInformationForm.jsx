import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-bold text-blue-900">
                    Информация профиля
                </h2>

                <p className="mt-2 text-blue-700">
                    Обновите информацию вашего профиля и email адрес.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel 
                        htmlFor="name" 
                        value="Имя" 
                        className="text-blue-900 font-medium"
                    />

                    <TextInput
                        id="name"
                        className="mt-2 block w-full rounded-lg border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel 
                        htmlFor="email" 
                        value="Email" 
                        className="text-blue-900 font-medium"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-2 block w-full rounded-lg border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* Блок верификации показывается только если mustVerifyEmail = true И email не верифицирован */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800">
                            Ваш email не подтвержден.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-1 font-medium text-blue-600 hover:text-blue-800 underline transition duration-200"
                            >
                                Отправить ссылку для подтверждения еще раз.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-green-600 font-medium">
                                Новая ссылка для подтверждения отправлена на ваш email.
                            </div>
                        )}
                    </div>
                )}

                {/* Блок для Google пользователей */}
                {user.google_id && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800 font-medium">
                            ✅ Ваш email подтвержден через Google
                        </p>
                    </div>
                )}

                {/* Блок для обычных пользователей с верификацией */}
                {!user.google_id && user.email_verified_at && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-800 font-medium">
                            ✅ Ваш email подтвержден
                        </p>
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton 
                        disabled={processing}
                        className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                    >
                        {processing ? 'Сохранение...' : 'Сохранить изменения'}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <p className="text-green-600 font-medium">
                            ✓ Изменения сохранены
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}