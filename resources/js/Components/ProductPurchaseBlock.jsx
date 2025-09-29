import { useState } from 'react';
import StripePayment from './StripePayment';

export default function ProductPurchaseBlock({ product }) {
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handlePurchase = () => setShowPaymentModal(true);
    
    const handleDemo = () => {
        alert('Демо-версия будет доступна после покупки. В реальном приложении здесь будет ссылка на демо.');
    };

    return (
        <>
            {/* Модальное окно оплаты */}
            <StripePayment
                amount={product.price}
                product={product}
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
            />

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
        </>
    );
}