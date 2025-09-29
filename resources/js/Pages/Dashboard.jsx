import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProductPurchaseBlock from '@/Components/ProductPurchaseBlock';
import ProductFeatures from '@/Components/ProductFeatures';
import FAQ from '@/Components/FAQ';
import { CustomerReviews } from '@/Components/CustomerReviews';

export default function Dashboard() {
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

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold text-blue-900">StudyPro AI Assistant</h2>}
        >
            <Head title="Купить программу - StudyPro" />

            <div className="py-8">
                <div className="mx-auto max-w-6xl">
                    {/* Основной блок с продуктом */}
                    <div className="grid lg:grid-cols-2 gap-12 mb-16">
                        {/* Левая колонка - блок покупки */}
                        <div>
                            <ProductPurchaseBlock product={product} />
                        </div>

                        {/* Правая колонка – особенности */}
                        <div>
                            <ProductFeatures product={product} />
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

                    {/* Отзывы */}
                    <CustomerReviews />
                    {/* FAQ */}
                    <FAQ />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}