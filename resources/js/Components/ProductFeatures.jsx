export default function ProductFeatures({ product }) {
    return (
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
    );
}