export default function Footer() {
    return (
        <footer className="bg-blue-900 text-white py-12 mt-auto">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold">StudyPro</span>
                        </div>
                        <p className="text-blue-200 text-sm">
                            Образовательная платформа нового поколения для школьников. 
                            Учись с удовольствием, достигай большего.
                        </p>
                    </div>
                    
                    <div>
                        <h4 className="font-bold mb-4 text-white">Продукт</h4>
                        <ul className="space-y-2 text-blue-200 text-sm">
                            <li><a href="#" className="hover:text-white transition duration-200">Все предметы</a></li>
                            <li><a href="#" className="hover:text-white transition duration-200">Тарифы</a></li>
                            <li><a href="#" className="hover:text-white transition duration-200">Бесплатный доступ</a></li>
                            <li><a href="#" className="hover:text-white transition duration-200">Мобильное приложение</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold mb-4 text-white">Поддержка</h4>
                        <ul className="space-y-2 text-blue-200 text-sm">
                            <li><a href="#" className="hover:text-white transition duration-200">Помощь</a></li>
                            <li><a href="#" className="hover:text-white transition duration-200">Контакты</a></li>
                            <li><a href="#" className="hover:text-white transition duration-200">FAQ</a></li>
                            <li><a href="#" className="hover:text-white transition duration-200">Сообщить о проблеме</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-bold mb-4 text-white">Компания</h4>
                        <ul className="space-y-2 text-blue-200 text-sm">
                            <li><a href="#" className="hover:text-white transition duration-200">О нас</a></li>
                            <li><a href="#" className="hover:text-white transition duration-200">Блог</a></li>
                            <li><a href="#" className="hover:text-white transition duration-200">Вакансии</a></li>
                            <li><a href="#" className="hover:text-white transition duration-200">Партнерство</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-blue-300 text-sm mb-4 md:mb-0">
                        © 2024 StudyPro. Все права защищены.
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-blue-300 hover:text-white transition duration-200">
                            <span className="sr-only">Facebook</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="#" className="text-blue-300 hover:text-white transition duration-200">
                            <span className="sr-only">Instagram</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.7-3.062-1.75-.614-1.05-.614-2.35 0-3.4.614-1.05 1.765-1.75 3.062-1.75s2.448.7 3.062 1.75c.614 1.05.614 2.35 0 3.4-.614 1.05-1.765 1.75-3.062 1.75zm7.55 0c-1.297 0-2.448-.7-3.062-1.75-.614-1.05-.614-2.35 0-3.4.614-1.05 1.765-1.75 3.062-1.75s2.448.7 3.062 1.75c.614 1.05.614 2.35 0 3.4-.614 1.05-1.765 1.75-3.062 1.75z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="#" className="text-blue-300 hover:text-white transition duration-200">
                            <span className="sr-only">Twitter</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}