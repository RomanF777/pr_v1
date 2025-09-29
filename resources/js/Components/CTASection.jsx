import React from 'react'
import { Link } from '@inertiajs/react';

export function CTASection() {
  return (
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
  );
}