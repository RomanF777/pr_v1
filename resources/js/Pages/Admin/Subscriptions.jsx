import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminNavigation from '@/Components/AdminNavigation';

export default function AdminSubscriptions({ subscriptions }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [showExtendModal, setShowExtendModal] = useState(false);
    
    const { data, setData, processing, errors } = useForm({
        months: 1
    });

    const handleSubscriptionAction = (user, action, months = null) => {
        if (action === 'extend') {
            setSelectedUser(user);
            setShowExtendModal(true);
            return;
        }

        if (confirm(`Вы уверены, что хотите ${getActionText(action)} подписку пользователя ${user.name}?`)) {
            router.post(`/admin/users/${user.id}/subscription`, {
                action: action,
                months: months
            });
        }
    };

    const handleExtend = () => {
        if (selectedUser) {
            router.post(`/admin/users/${selectedUser.id}/subscription`, {
                action: 'extend',
                months: data.months
            });
            setShowExtendModal(false);
            setSelectedUser(null);
        }
    };

    const getActionText = (action) => {
        const actions = {
            activate: 'активировать',
            deactivate: 'деактивировать',
            extend: 'продлить'
        };
        return actions[action] || action;
    };

    const getStatusBadge = (status) => {
        const styles = {
            active: 'bg-green-100 text-green-800',
            expired: 'bg-red-100 text-red-800',
            inactive: 'bg-gray-100 text-gray-800'
        };
        
        const texts = {
            active: 'Активна',
            expired: 'Истекла',
            inactive: 'Неактивна'
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
                {texts[status]}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-blue-900">
                    Управление подписками
                </h2>
            }
        >
            <Head title="Подписки - StudyPro" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto">
                    <AdminNavigation />

                    {/* Модальное окно продления */}
                    {showExtendModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Продлить подписку
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Продлить подписку для {selectedUser?.name}?
                                </p>
                                
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Количество месяцев
                                    </label>
                                    <select
                                        value={data.months}
                                        onChange={e => setData('months', parseInt(e.target.value))}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {[1, 3, 6, 12].map(month => (
                                            <option key={month} value={month}>
                                                {month} {month === 1 ? 'месяц' : month < 5 ? 'месяца' : 'месяцев'}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.months && <p className="text-red-500 text-sm mt-1">{errors.months}</p>}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleExtend}
                                        disabled={processing}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200"
                                    >
                                        {processing ? 'Обработка...' : 'Продлить'}
                                    </button>
                                    <button
                                        onClick={() => setShowExtendModal(false)}
                                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-medium transition duration-200"
                                    >
                                        Отмена
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b-2 border-gray-200">
                                        <th className="text-left p-3">Пользователь</th>
                                        <th className="text-left p-3">Лицензионный ключ</th>
                                        <th className="text-left p-3">Статус</th>
                                        <th className="text-left p-3">Начало</th>
                                        <th className="text-left p-3">Окончание</th>
                                        <th className="text-left p-3">Осталось дней</th>
                                        <th className="text-left p-3">Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subscriptions.data.map(user => (
                                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="p-3">
                                                <div>
                                                    <div className="font-medium text-blue-900">{user.name}</div>
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                {user.license_key ? (
                                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                                                        {user.license_key}
                                                    </code>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">Не сгенерирован</span>
                                                )}
                                            </td>
                                            <td className="p-3">
                                                {getStatusBadge(user.subscription_status)}
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                {user.subscription_start ? 
                                                    new Date(user.subscription_start).toLocaleDateString('ru-RU') : 
                                                    '-'
                                                }
                                            </td>
                                            <td className="p-3 text-sm text-gray-600">
                                                {user.subscription_end ? 
                                                    new Date(user.subscription_end).toLocaleDateString('ru-RU') : 
                                                    '-'
                                                }
                                            </td>
                                            <td className="p-3">
                                                {user.days_remaining > 0 ? (
                                                    <span className="text-green-600 font-medium">
                                                        {user.days_remaining} д.
                                                    </span>
                                                ) : user.days_remaining === 0 ? (
                                                    <span className="text-orange-600 font-medium">
                                                        Сегодня
                                                    </span>
                                                ) : (
                                                    <span className="text-red-600 font-medium">
                                                        Просрочена
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-3">
                                                <div className="flex gap-2">
                                                    {(!user.license_key || user.subscription_status === 'inactive') && (
                                                        <button
                                                            onClick={() => router.post(`/admin/users/${user.id}/license`)}
                                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition duration-200"
                                                        >
                                                            Ключ
                                                        </button>
                                                    )}
                                                    
                                                    {user.subscription_status !== 'active' && (
                                                        <button
                                                            onClick={() => handleSubscriptionAction(user, 'activate')}
                                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition duration-200"
                                                        >
                                                            Активировать
                                                        </button>
                                                    )}
                                                    
                                                    {user.subscription_status === 'active' && (
                                                        <button
                                                            onClick={() => handleSubscriptionAction(user, 'extend')}
                                                            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm transition duration-200"
                                                        >
                                                            Продлить
                                                        </button>
                                                    )}
                                                    
                                                    {user.subscription_status === 'active' && (
                                                        <button
                                                            onClick={() => handleSubscriptionAction(user, 'deactivate')}
                                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition duration-200"
                                                        >
                                                            Отключить
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Пагинация */}
                        {subscriptions.links && (
                            <div className="mt-6 flex justify-center">
                                <div className="flex gap-2">
                                    {subscriptions.links.map((link, index) => (
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