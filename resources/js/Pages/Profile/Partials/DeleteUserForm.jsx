import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-xl font-bold text-blue-900">
                    Удаление аккаунта
                </h2>

                <p className="mt-2 text-blue-700">
                    После удаления аккаунта все ваши данные будут безвозвратно удалены. 
                    Пожалуйста, сохраните всю важную информацию перед удалением.
                </p>
            </header>

            <DangerButton 
                onClick={confirmUserDeletion}
                className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
            >
                Удалить аккаунт
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-4">
                        Вы уверены, что хотите удалить аккаунт?
                    </h2>

                    <p className="text-blue-700 mb-6">
                        Это действие нельзя отменить. Все ваши данные будут удалены навсегда. 
                        Для подтверждения введите ваш пароль.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Пароль"
                            className="text-blue-900 font-medium mb-2"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full rounded-lg border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                            isFocused
                            placeholder="Введите ваш пароль"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <SecondaryButton 
                            onClick={closeModal}
                            className="border-blue-200 text-blue-700 hover:bg-blue-50"
                        >
                            Отмена
                        </SecondaryButton>

                        <DangerButton 
                            className="bg-red-600 hover:bg-red-700 focus:ring-red-500" 
                            disabled={processing}
                        >
                            {processing ? 'Удаление...' : 'Удалить аккаунт'}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}