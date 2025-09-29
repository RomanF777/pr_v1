import { Link, usePage } from '@inertiajs/react';
import Footer from '@/Components/Footer';

export default function GuestLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
            {/* Header как на главной странице */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Link href="/" className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v6l9-5M12 20l-9-5" />
                                    </svg>
                                </div>
                                <span className="text-2xl font-bold text-blue-800">StudyPro</span>
                            </Link>
                        </div>
                        
                        <nav className="flex items-center space-x-6">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                                >
                                    Личный кабинет
                                </Link>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href={route('login')}
                                        className="text-blue-800 font-medium hover:text-blue-600 transition duration-200"
                                    >
                                        Вход
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
                                    >
                                        Начать учиться
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Основной контент - формы */}
            <main className="flex-1 py-12">
                <div className="container mx-auto px-6">
                    <div className="max-w-md mx-auto">
                        {children}
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}