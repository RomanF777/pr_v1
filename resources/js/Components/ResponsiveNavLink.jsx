import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-blue-600 text-blue-900 bg-blue-50 focus:bg-blue-100 focus:border-blue-700 '
                    : 'border-transparent text-blue-600 hover:text-blue-800 hover:bg-blue-50 hover:border-blue-300 focus:text-blue-800 focus:bg-blue-50 focus:border-blue-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}