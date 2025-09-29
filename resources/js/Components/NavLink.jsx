import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-blue-600 text-blue-900 focus:border-blue-700 '
                    : 'border-transparent text-blue-600 hover:text-blue-800 hover:border-blue-300 focus:text-blue-800 focus:border-blue-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}