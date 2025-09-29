import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="StudyPro - Учись умнее, а не сложнее" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="container mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v6l9-5M12 20l-9-5" />
                                    </svg>
                                </div>
                                <span className="text-2xl font-bold text-blue-800">StudyPro</span>
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

                {/* Hero Section */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-4xl mx-auto">
                            <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
                                Учись с удовольствием, 
                                <span className="text-blue-600"> достигай большего</span>
                            </h1>
                            <p className="text-xl text-blue-700 mb-8 leading-relaxed">
                                Интерактивная платформа, которая превращает обучение в увлекательное приключение. 
                                Персонализированные задания, мгновенная проверка и прогресс в реальном времени.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link
                                    href={route('register')}
                                    className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl"
                                >
                                    Попробовать бесплатно
                                </Link>
                                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition duration-200">
                                    Узнать больше
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold text-center text-blue-900 mb-16">
                            Почему школьники выбирают StudyPro?
                        </h2>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="text-center p-6">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-blue-900 mb-4">Мгновенная проверка</h3>
                                <p className="text-blue-700">
                                    Получай feedback сразу после выполнения задания. Узнавай свои ошибки и улучшай результат.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="text-center p-6">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-blue-900 mb-4">Умные подсказки</h3>
                                <p className="text-blue-700">
                                    Не просто ответы, а пошаговые объяснения. Понял принцип - решил все похожие задачи.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="text-center p-6">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-blue-900 mb-4">Отслеживание прогресса</h3>
                                <p className="text-blue-700">
                                    Наглядная статистика твоего роста. Видишь, как с каждым днем становишься лучше.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Subjects Section */}
                <section className="py-16 bg-blue-50">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold text-center text-blue-900 mb-16">
                            Все школьные предметы в одном месте
                        </h2>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            {['Математика', 'Физика', 'Химия', 'Биология', 'История', 'География', 'Литература', 'Английский'].map((subject, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition duration-200">
                                    <div className="text-2xl font-bold text-blue-600 mb-2">{subject}</div>
                                    <div className="text-blue-700 text-sm">от 5 до 11 класс</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-blue-600">
                    <div className="container mx-auto px-6">
                        <div className="text-center text-white max-w-3xl mx-auto">
                            <h2 className="text-4xl font-bold mb-6">
                                Готовы улучшить свои оценки?
                            </h2>
                            <p className="text-xl mb-8 opacity-90">
                                Присоединяйтесь к тысячам школьников, которые уже используют StudyPro для эффективной подготовки к урокам и экзаменам.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition duration-200"
                                >
                                    Начать бесплатно
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition duration-200"
                                >
                                    У меня есть аккаунт
                                </Link>
                            </div>
                            <p className="mt-4 text-blue-200">
                                Первые 7 дней бесплатно для всех новых пользователей
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}