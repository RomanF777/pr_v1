import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AdminNavigation from '@/Components/AdminNavigation';

export default function AdminDashboard({ stats, recent_users, expiring_subscriptions }) {
    const getVerificationBadge = (user) => {
        if (user.verification_type === 'google') {
            return (
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                    Google
                </span>
            );
        } else if (user.verification_type === 'email') {
            return (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    Email
                </span>
            );
        } else {
            return (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                    Ожидает
                </span>
            );
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-blue-900">
                    Панель администратора
                </h2>
            }
        >
            <Head title="Админка - StudyPro" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto">
                    <AdminNavigation />

                    {/* Статистика */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
                            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.total_users}</div>
                            <div className="text-blue-800 font-medium">Всего пользователей</div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
                            <div className="text-3xl font-bold text-green-600 mb-2">{stats.verified_users}</div>
                            <div className="text-green-800 font-medium">Верифицированных</div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-200">
                            <div className="text-3xl font-bold text-purple-600 mb-2">{stats.google_users}</div>
                            <div className="text-purple-800 font-medium">Через Google</div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-200">
                            <div className="text-3xl font-bold text-red-600 mb-2">{stats.admin_users}</div>
                            <div className="text-red-800 font-medium">Администраторов</div>
                        </div>
                    </div>

                    {/* Дополнительная статистика по подпискам */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
                            <div className="text-3xl font-bold text-green-600 mb-2">{stats.active_subscriptions}</div>
                            <div className="text-green-800 font-medium">Активных подписок</div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-200">
                            <div className="text-3xl font-bold text-orange-600 mb-2">{stats.expired_subscriptions}</div>
                            <div className="text-orange-800 font-medium">Истекших подписок</div>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
                            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.total_revenue}€</div>
                            <div className="text-blue-800 font-medium">Общий доход</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Последние пользователи */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
                            <h3 className="text-xl font-bold text-blue-900 mb-4">Последние пользователи</h3>
                            <div className="space-y-3">
                                {recent_users.map(user => (
                                    <div key={user.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                        <div>
                                            <div className="font-medium text-blue-900">{user.name}</div>
                                            <div className="text-sm text-blue-600">{user.email}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getVerificationBadge(user)}
                                            {user.is_admin && <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Admin</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Истекающие подписки */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-200">
                            <h3 className="text-xl font-bold text-orange-900 mb-4">Истекающие подписки (7 дней)</h3>
                            <div className="space-y-3">
                                {expiring_subscriptions && expiring_subscriptions.length > 0 ? (
                                    expiring_subscriptions.map(user => (
                                        <div key={user.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                            <div>
                                                <div className="font-medium text-orange-900">{user.name}</div>
                                                <div className="text-sm text-orange-600">
                                                    Осталось: {user.days_remaining} дней
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                До: {new Date(user.subscription_end).toLocaleDateString('ru-RU')}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center py-4">Нет истекающих подписок</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}