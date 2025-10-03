import { Link } from '@inertiajs/react';

export default function AdminNavigation() {
    const navItems = [
        { href: '/admin/dashboard', label: 'Дашборд', icon: '📊' },
        { href: '/admin/users', label: 'Пользователи', icon: '👥' },
        { href: '/admin/subscriptions', label: 'Подписки', icon: '💰' },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-lg p-4 border border-blue-200 mb-6">
            <div className="flex flex-wrap gap-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition duration-200 ${
                            route().current(item.href.replace('/admin/', 'admin.'))
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                        }`}
                    >
                        <span>{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}