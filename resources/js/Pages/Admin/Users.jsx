import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function AdminUsers({ users }) {
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
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="text-left p-3">Имя</th>
                                        <th className="text-left p-3">Email</th>
                                        <th className="text-left p-3">Тип</th>
                                        <th className="text-left p-3">Статус</th>
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
                                                {user.email_verified_at ? (
                                                    <span className="text-green-600">✓ Верифицирован</span>
                                                ) : (
                                                    <span className="text-yellow-600">⏳ Ожидает</span>
                                                )}
                                            </td>
                                            <td className="p-3 text-sm text-gray-500">
                                                {new Date(user.created_at).toLocaleDateString('ru-RU')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}