import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import AdminNavigation from '@/Components/AdminNavigation';

export default function AdminUsers({ users }) {
    const getSubscriptionBadge = (user) => {
        if (user.subscription_status === 'active') {
            return (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Активна ({user.days_remaining} д.)
                </span>
            );
        } else if (user.subscription_status === 'expired') {
            return (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                    Истекла
                </span>
            );
        } else {
            return (
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                    Нет подписки
                </span>
            );
        }
    };

    const getVerificationBadge = (user) => {
        if (user.verification_type === 'google') {
            return (
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                    ✓ Google
                </span>
            );
        } else if (user.verification_type === 'email') {
            return (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    ✓ Email
                </span>
            );
        } else {
            return (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                    ⏳ Ожидает
                </span>
            );
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-blue-900">
                    Управление пользователями
                </h2>
            }
        >
            <Head title="Пользователи - StudyPro" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto">
                    <AdminNavigation />

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="text-left p-3">Имя</th>
                                        <th className="text-left p-3">Email</th>
                                        <th className="text-left p-3">Тип</th>
                                        <th className="text-left p-3">Верификация</th>
                                        <th className="text-left p-3">Подписка</th>
                                        <th className="text-left p-3">Дата регистрации</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map(user => (
                                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="p-3">{user.name}</td>
                                            <td className="p-3">{user.email}</td>
                                            <td className="p-3">
                                                {user.google_id ? 'Google' : 'Email'}
                                                {user.is_admin && <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Admin</span>}
                                            </td>
                                            <td className="p-3">
                                                {getVerificationBadge(user)}
                                            </td>
                                            <td className="p-3">
                                                {getSubscriptionBadge(user)}
                                            </td>
                                            <td className="p-3 text-sm text-gray-500">
                                                {new Date(user.created_at).toLocaleDateString('ru-RU')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Пагинация */}
                        {users.links && (
                            <div className="mt-6 flex justify-center">
                                <div className="flex gap-2">
                                    {users.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => link.url && router.get(link.url)}
                                            disabled={!link.url}
                                            className={`px-3 py-1 rounded border ${
                                                link.active
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                            } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}