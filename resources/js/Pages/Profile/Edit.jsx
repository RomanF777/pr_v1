import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-blue-900">
                    Настройки профиля
                </h2>
            }
        >
            <Head title="Профиль - StudyPro" />

            <div className="py-8">
                <div className="mx-auto max-w-4xl space-y-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-blue-100">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-blue-100">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-blue-100">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}