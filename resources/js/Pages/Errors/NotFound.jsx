import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import FAQ from '@/Components/FAQ';

export default function NotFound() {
    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center p-16">
            <Head title="Страница не найдена - StudyPro" />
            
            <div className="text-center max-w-2xl">
                {/* Робот */}
                <div className="relative mb-8">
                    <div className="w-48 h-48 mx-auto bg-gray-800 rounded-full flex items-center justify-center border-4 border-blue-500 shadow-2xl">
                        <div className="relative">
                            <div className="w-32 h-32 bg-gray-700 rounded-2xl flex items-center justify-center relative border-4 border-green-400">
                                <div className="flex space-x-6">
                                    <div className="w-10 h-10 bg-red-500 rounded-full animate-pulse"></div>
                                    <div className="w-10 h-10 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                </div>
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                                    <div className="w-3 h-8 bg-yellow-400 rounded-t-lg"></div>
                                    <div className="w-4 h-4 bg-red-500 rounded-full mx-auto -mt-2 animate-ping"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="absolute -top-2 right-4 bg-white text-gray-900 px-6 py-3 rounded-2xl rounded-br-none shadow-2xl animate-bounce border-2 border-blue-500">
                        <div className="text-lg font-bold">Ой! 404!</div>
                    </div>
                </div>

                {/* Текст */}
                <h1 className="text-7xl md:text-9xl font-black mb-6 text-white drop-shadow-2xl">
                    404
                </h1>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                    Страница потерялась в космосе! 🚀
                </h2>
                
                <div className="bg-gray-800 rounded-2xl p-6 mb-8 border-2 border-yellow-400">
                    <p className="text-xl md:text-2xl mb-4 text-white font-medium">
                        Кажется, наша страница отправилась в межгалактическое путешествие!
                    </p>
                    <p className="text-lg text-gray-300">
                        Не волнуйтесь, наши роботы уже ищут её во всех уголках вселенной
                    </p>
                </div>

                {/* Кнопки */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <Link
                        href="/"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3 min-w-[200px] justify-center border-2 border-blue-400"
                    >
                        🏠 На главную
                    </Link>
                    
                    <button 
                        onClick={() => window.history.back()}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3 min-w-[200px] justify-center border-2 border-purple-400"
                    >
                        ↩️ Назад
                    </button>
                </div>

                {/* Информация */}
                <div className="bg-gray-800 rounded-2xl p-6 border-2 border-green-400">
                    <h3 className="text-xl font-bold mb-4 text-white">Что случилось?</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-left">
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <div className="text-yellow-400 font-bold mb-2">🚀 Версия 1</div>
                            <div className="text-white">Страницу похитили инопланетяне для изучения</div>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <div className="text-yellow-400 font-bold mb-2">🌌 Версия 2</div>
                            <div className="text-white">Она попала в черную дыру и теперь в параллельной вселенной</div>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <div className="text-yellow-400 font-bold mb-2">🛸 Версия 3</div>
                            <div className="text-white">Страница просто решила отдохнуть на Марсе</div>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
                            <div className="text-yellow-400 font-bold mb-2">⭐ Версия 4</div>
                            <div className="text-white">Она превратилась в звезду и теперь светит на небе</div>
                        </div>
                    </div>
                </div>

                {/* Статус */}
                <div className="mt-6 bg-red-600/20 border-2 border-red-500 rounded-2xl p-4">
                    <div className="text-red-200 font-bold flex items-center justify-center gap-2">
                        <span>🚨</span>
                        ВЕДЕТСЯ ПОИСК ВО ВСЕЙ ГАЛАКТИКЕ
                    </div>
                </div>
            </div>
        </div>
        <FAQ />
        <Footer />
        </>
    );
}