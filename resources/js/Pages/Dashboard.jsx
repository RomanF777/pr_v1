import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import StripePayment from '@/Components/StripePayment';

export default function Dashboard() {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    
    const product = {
        name: "StudyPro AI Assistant",
        description: "Мощный ИИ-помощник для учебы, который работает незаметно в фоне",
        price: 2990,          // в центах евро (29.90 €)
        originalPrice: 4990,   // в центах евро (49.90 €)
        discount: "40%",
        features: [
            "Выделяйте любой текст и получайте мгновенные объяснения",
            "Автоматическое решение тестов с вариантами ответов",
            "Работает в фоне без привлечения внимания",
            "Поддержка всех школьных предметов 5-11 класс",
            "Оффлайн-режим после активации",
            "Пожизненная лицензия (без подписок)",
            "Регулярные обновления и новые функции",
            "Приоритетная техническая поддержка"
        ],
        systemRequirements: [
            "Windows 10/11 или macOS 10.14+",
            "4GB оперативной памяти",
            "500MB свободного места",
            "Стабильное интернет-соединение для активации"
        ]
    };

    const handlePurchase = () => setShowPaymentModal(true);
    const handleDemo = () => {
        alert('Демо-версия будет доступна после покупки. В реальном приложении здесь будет ссылка на демо.');
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold text-blue-900">StudyPro AI Assistant</h2>}
        >
            <Head title="Купить программу - StudyPro" />

            {/* Модальное окно оплаты */}
            <StripePayment
                amount={product.price}        // в центах евро
                product={product}
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
            />

            <div className="py-8">
                <div className="mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 mb-16">
                        {/* Левая колонка - описание */}
                        <div>
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h1 className="text-3xl font-bold text-blue-900">{product.name}</h1>
                                </div>

                                <p className="text-blue-700 text-lg mb-6 leading-relaxed">
                                    {product.description}
                                </p>

                                {/* Цена */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                                    <div className="flex items-end gap-4 mb-2">
                                        <div className="text-4xl font-bold text-blue-900">
                                            {(product.price / 100).toFixed(2)} €
                                        </div>
                                        <div className="text-lg text-gray-500 line-through">
                                            {(product.originalPrice / 100).toFixed(2)} €
                                        </div>
                                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                            -{product.discount}
                                        </div>
                                    </div>
                                    <p className="text-blue-600 text-sm">Единоразовый платеж • Пожизненная лицензия</p>
                                </div>

                                {/* Кнопки */}
                                <div className="space-y-4">
                                    <button
                                        onClick={handlePurchase}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        Купить и скачать сейчас
                                    </button>

                                    <button
                                        onClick={handleDemo}
                                        className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-xl font-bold transition duration-200"
                                    >
                                        Посмотреть демо-версию
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Правая колонка – особенности */}
                        <div className="space-y-6">
                            {/* Основные возможности */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
                                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Основные возможности
                                </h3>
                                <ul className="space-y-3">
                                    {product.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-blue-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Системные требования */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
                                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Системные требования
                                </h3>
                                <ul className="space-y-2">
                                    {product.systemRequirements.map((req, i) => (
                                        <li key={i} className="flex items-center gap-3 text-blue-700">
                                            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            {req}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Дополнительная информация */}
                    <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">
                                Как это работает?
                            </h3>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-blue-800 mb-2">1. Скачайте и установите</h4>
                                <p className="text-blue-700 text-sm">
                                    После оплаты скачайте программу и установите на свой компьютер
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.5 16.5l9-9" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-blue-800 mb-2">2. Выделяйте текст</h4>
                                <p className="text-blue-700 text-sm">
                                    Просто выделяйте любой текст или вопросы - ИИ мгновенно поможет
                                </p>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-blue-800 mb-2">3. Учитесь эффективнее</h4>
                                <p className="text-blue-700 text-sm">
                                    Получайте объяснения и решения мгновенно, без лишних действий
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Гарантии */}
                    <div className="mt-8 grid md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl p-6 text-center border border-blue-100">
                            <div className="text-blue-600 font-bold text-lg mb-2">🚀 Мгновенная доставка</div>
                            <div className="text-blue-700 text-sm">Ссылка для скачивания сразу после оплаты</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center border border-blue-100">
                            <div className="text-blue-600 font-bold text-lg mb-2">💎 Пожизненная лицензия</div>
                            <div className="text-blue-700 text-sm">Никаких подписок и скрытых платежей</div>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center border border-blue-100">
                            <div className="text-blue-600 font-bold text-lg mb-2">🔒 Гарантия возврата</div>
                            <div className="text-blue-700 text-sm">30 дней на возврат средств если не подойдет</div>
                        </div>
                    </div>

                    {/* Отзывы (дополнительный блок) */}
                    <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
                        <h3 className="text-2xl font-bold text-blue-900 text-center mb-8">
                            Что говорят наши пользователи
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-blue-50 rounded-xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                        А
                                    </div>
                                    <div>
                                        <div className="font-bold text-blue-900">Анна</div>
                                        <div className="text-yellow-500">★★★★★</div>
                                    </div>
                                </div>
                                <p className="text-blue-700 text-sm">
                                    "Экономит мне 2-3 часа каждый день! Тесты решаются моментально, а объяснения очень понятные."
                                </p>
                            </div>
                            
                            <div className="bg-blue-50 rounded-xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                        М
                                    </div>
                                    <div>
                                        <div className="font-bold text-blue-900">Максим</div>
                                        <div className="text-yellow-500">★★★★★</div>
                                    </div>
                                </div>
                                <p className="text-blue-700 text-sm">
                                    "Работает действительно незаметно. Учителя даже не подозревают, что у меня такая помощь."
                                </p>
                            </div>
                            
                            <div className="bg-blue-50 rounded-xl p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                        К
                                    </div>
                                    <div>
                                        <div className="font-bold text-blue-900">Кирилл</div>
                                        <div className="text-yellow-500">★★★★★</div>
                                    </div>
                                </div>
                                <p className="text-blue-700 text-sm">
                                    "Лучшее вложение в учебу! За месяц использования средний балл вырос с 3.8 до 4.5."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
                        <h3 className="text-2xl font-bold text-blue-900 text-center mb-8">
                            Часто задаваемые вопросы
                        </h3>
                        <div className="space-y-6 max-w-4xl mx-auto">
                            <div className="border-b border-blue-100 pb-4">
                                <h4 className="font-bold text-blue-800 mb-2">Как быстро я получу программу после оплаты?</h4>
                                <p className="text-blue-700 text-sm">Ссылка для скачивания приходит моментально после успешной оплаты на вашу почту и становится доступна в личном кабинете.</p>
                            </div>
                            
                            <div className="border-b border-blue-100 pb-4">
                                <h4 className="font-bold text-blue-800 mb-2">Нужен ли интернет для работы программы?</h4>
                                <p className="text-blue-700 text-sm">Интернет нужен только для первоначальной активации. После активации программа работает полностью оффлайн.</p>
                            </div>
                            
                            <div className="border-b border-blue-100 pb-4">
                                <h4 className="font-bold text-blue-800 mb-2">Что если программа не подойдет?</h4>
                                <p className="text-blue-700 text-sm">Мы даем 30 дней на возврат средств. Если программа не заработает на вашем компьютере или не оправдает ожиданий - вернем деньги.</p>
                            </div>
                            
                            <div>
                                <h4 className="font-bold text-blue-800 mb-2">Будут ли обновления?</h4>
                                <p className="text-blue-700 text-sm">Да, все обновления бесплатны для владельцев лицензии. Мы постоянно улучшаем программу и добавляем новые функции.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}