import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Footer from '@/Components/Footer';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
            <nav className="border-b border-blue-200 bg-white shadow-sm">
                <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex items-center">
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v6l9-5M12 20l-9-5" />
                                        </svg>
                                    </div>
                                    <span className="text-xl font-bold text-blue-800">StudyPro</span>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className="text-blue-700 hover:text-blue-900 font-medium transition duration-200"
                                >
                                    Личный кабинет
                                </NavLink>
                                
                                {/* Ссылка на админку - только для администраторов */}
                                {user.is_admin && (
                                    <NavLink
                                        href={route('admin.dashboard')}
                                        active={route().current('admin.*')}
                                        className="text-blue-700 hover:text-blue-900 font-medium transition duration-200"
                                    >
                                        Админка
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-800 transition duration-150 ease-in-out hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >
                                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                {user.name}
                                                {user.is_admin && (
                                                    <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">
                                                        Admin
                                                    </span>
                                                )}
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content className="bg-white border border-blue-200 rounded-xl shadow-lg py-2 mt-2">
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                            className="text-blue-700 hover:bg-blue-50 px-4 py-2 transition duration-200"
                                        >
                                            Профиль
                                        </Dropdown.Link>
                                        <hr className="my-1 border-blue-200" />
                                        
                                        {/* Ссылка на админку в выпадающем меню */}
                                        {user.is_admin && (
                                            <>
                                                <Dropdown.Link
                                                    href={route('admin.dashboard')}
                                                    className="text-blue-700 hover:bg-blue-50 px-4 py-2 transition duration-200 w-full text-left"
                                                >
                                                    Админка
                                                </Dropdown.Link>
                                                <hr className="my-1 border-blue-200" />
                                            </>
                                        )}
                                        
                                        <Dropdown.Link
                                            href={route('dashboard')}
                                            className="text-blue-700 hover:bg-blue-50 px-4 py-2 transition duration-200 w-full text-left"
                                        >
                                            Личный кабинет
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="text-blue-700 hover:bg-blue-50 px-4 py-2 transition duration-200 w-full text-left"
                                        >
                                            Выйти
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-lg p-2 text-blue-600 transition duration-150 ease-in-out hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden bg-white border-t border-blue-200'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            className="text-blue-700 hover:text-blue-900"
                        >
                            Личный кабинет
                        </ResponsiveNavLink>
                        
                        {/* Ссылка на админку в мобильном меню */}
                        {user.is_admin && (
                            <ResponsiveNavLink
                                href={route('admin.dashboard')}
                                active={route().current('admin.*')}
                                className="text-blue-700 hover:text-blue-900"
                            >
                                Админка
                            </ResponsiveNavLink>
                        )}
                    </div>

                    <div className="border-t border-blue-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="text-base font-medium text-blue-900">
                                        {user.name}
                                        {user.is_admin && (
                                            <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">
                                                Admin
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-sm font-medium text-blue-600">
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink 
                                href={route('profile.edit')}
                                className="text-blue-700 hover:text-blue-900"
                            >
                                Профиль
                            </ResponsiveNavLink>
                            
                            {/* Ссылка на админку в мобильном меню профиля */}
                            {user.is_admin && (
                                <ResponsiveNavLink
                                    href={route('admin.dashboard')}
                                    className="text-blue-700 hover:text-blue-900"
                                >
                                    Админка
                                </ResponsiveNavLink>
                            )}
                            
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="text-blue-700 hover:text-blue-900 w-full text-left"
                            >
                                Выйти
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow-sm">
                    <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-2xl font-bold text-blue-900">{header}</h1>
                    </div>
                </header>
            )}

            <main className="flex-1 w-full">
                {children}
            </main>
            
            <Footer />
        </div>
    );
}