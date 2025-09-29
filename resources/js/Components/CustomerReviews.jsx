import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import FAQ from './FAQ'

const reviews = [
    {
        initial: 'А',
        name: 'Анна',
        rating: '★★★★★',
        text: 'Экономит мне 2-3 часа каждый день! Тесты решаются моментально, а объяснения очень понятные.',
    },
    {
        initial: 'М',
        name: 'Максим',
        rating: '★★★★★',
        text: 'Работает действительно незаметно. Учителя даже не подозревают, что у меня такая помощь.',
    },
    {
        initial: 'К',
        name: 'Кирилл',
        rating: '★★★★★',
        text: 'Лучшее вложение в учебу! За месяц использования средний балл вырос с 3.8 до 4.5.',
    },
]

export function CustomerReviews() {
    return (
        <div className=" m-6 bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-blue-900 text-center mb-8">
                Что говорят наши пользователи
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map(({ initial, name, rating, text }, idx) => (
                    <div key={name} className="bg-blue-50 rounded-xl p-6">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                                {initial}
                            </div>
                            <div>
                                <div className="font-bold text-blue-900">{name}</div>
                                <div className="text-yellow-500">{rating}</div>
                            </div>
                        </div>
                        <p className="text-blue-700 text-sm">
                            "{text}"
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}