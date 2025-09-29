import { useState } from 'react';

export default function FAQ() {
    const [openItems, setOpenItems] = useState({});

    const faqItems = [
        {
            id: 1,
            question: "Как быстро я получу программу после оплаты?",
            answer: "Ссылка для скачивания приходит моментально после успешной оплаты на вашу почту и становится доступна в личном кабинете. Обычно это занимает не более 1-2 минут."
        },
        {
            id: 2,
            question: "Нужен ли интернет для работы программы?",
            answer: "Интернет нужен только для первоначальной активации лицензии. После активации программа работает полностью оффлайн. Все вычисления происходят локально на вашем компьютере."
        },
        {
            id: 3,
            question: "Что если программа не подойдет?",
            answer: "Мы даем 30 дней на возврат средств. Если программа не заработает на вашем компьютере или не оправдает ваши ожидания - мы вернем деньги без лишних вопросов."
        },
        {
            id: 4,
            question: "Будут ли обновления?",
            answer: "Да, все обновления бесплатны для владельцев лицензии. Мы постоянно улучшаем программу, добавляем новые функции и поддерживаем совместимость с новыми версиями операционных систем."
        },
        {
            id: 5,
            question: "На каких устройствах работает программа?",
            answer: "Программа работает на Windows 10/11 и macOS 10.14+. Требуется минимум 4GB оперативной памяти и 500MB свободного места на диске."
        },
        {
            id: 6,
            question: "Можно ли использовать программу на нескольких компьютерах?",
            answer: "Одна лицензия действует на одном компьютере. Если вам нужно установить программу на несколько устройств, потребуется приобрести отдельную лицензию для каждого."
        },
        {
            id: 7,
            question: "Какие предметы поддерживает ИИ-помощник?",
            answer: "Программа поддерживает все основные школьные предметы с 5 по 11 класс: математика, физика, химия, биология, история, литература, русский и английский языки, и многие другие."
        },
        {
            id: 8,
            question: "Как происходит активация программы?",
            answer: "После установки вам нужно будет ввести лицензионный ключ, который вы получите после оплаты. Активация происходит онлайн один раз, после чего программа работает оффлайн."
        },
        {
            id: 9,
            question: "Техническая поддержка доступна?",
            answer: "Да, владельцы лицензии получают приоритетную техническую поддержку. Мы отвечаем на вопросы в течение 24 часов и помогаем решить любые технические проблемы."
        },
        {
            id: 10,
            question: "Можно ли попробовать демо-версию?",
            answer: "Демо-версия доступна после покупки в виде ограниченной по времени пробной версии. Она включает все основные функции, но с ограничением по времени использования."
        }
    ];

    const toggleItem = (id) => {
        setOpenItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="m-6 bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">
                    Часто задаваемые вопросы
                </h3>
                <p className="text-blue-600 text-lg">
                    Всё, что нужно знать о StudyPro AI Assistant
                </p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
                {faqItems.map((item) => (
                    <div 
                        key={item.id}
                        className="border border-blue-100 rounded-xl transition-all duration-200 hover:shadow-md"
                    >
                        <button
                            onClick={() => toggleItem(item.id)}
                            className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-blue-50 rounded-xl transition-colors duration-200"
                        >
                            <h4 className="font-bold text-blue-800 text-lg flex-1">
                                {item.question}
                            </h4>
                            <svg 
                                className={`w-5 h-5 text-blue-600 transition-transform duration-200 flex-shrink-0 ${
                                    openItems[item.id] ? 'rotate-180' : ''
                                }`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        
                        <div className={`px-6 transition-all duration-200 overflow-hidden ${
                            openItems[item.id] ? 'pb-4 max-h-96' : 'max-h-0'
                        }`}>
                            <div className="border-t border-blue-100 pt-4">
                                <p className="text-blue-700 leading-relaxed">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Дополнительная информация */}
            <div className="mt-8 text-center">
                <div className="bg-blue-50 rounded-xl p-6 inline-block">
                    <p className="text-blue-700 font-medium">
                        Не нашли ответ на свой вопрос?
                    </p>
                    <p className="text-blue-600 text-sm mt-1">
                        Напишите нам на support@studypro.ru - мы ответим в течение 24 часов
                    </p>
                </div>
            </div>
        </div>
    );
}