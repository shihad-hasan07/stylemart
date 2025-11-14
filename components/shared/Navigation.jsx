'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoIosArrowForward } from "react-icons/io";

const Navigation = ({
    customPaths = {},      // Custom route names
    productName = null,    // Product/page specific name
    className = '',        // Custom styling
    separator = <IoIosArrowForward /> // Custom separator
}) => {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(segment => segment);

    // Default route names
    const defaultRouteNames = {
        'shop': 'Shop',
        'men': 'Men',
        'women': 'Women',
        'shirts': 'Shirts',
        'outerwear': 'Outerwear',
        'clothing': 'Clothing',
        'cart': 'Shopping Cart',
        'checkout': 'Checkout',
        'about': 'About Us',
        'contact': 'Contact'
    };

    // Merge custom paths with defaults
    const routeNames = { ...defaultRouteNames, ...customPaths };

    return (
        <div className={`flex items-center gap-1 text-[14px] flex-wrap ${className}`}>
            <Link href='/' className='hover:text-blue-600 transition'>
                <p>Home</p>
            </Link>

            {pathSegments.map((segment, index) => {
                const href = '/' + pathSegments.slice(0, index + 1).join('/');
                const isLast = index === pathSegments.length - 1;

                // Get label from routeNames or format segment
                let label = routeNames[segment] || segment
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                // If last segment and productName provided
                if (isLast && productName) {
                    label = productName;
                }

                return (
                    <div key={href} className='flex items-center gap-1'>
                        <span className='text-gray-400'>{separator}</span>
                        <Link
                            href={href}
                            className={`transition ${isLast ? 'text-gray-400 cursor-default pointer-events-none' : 'hover:text-blue-600'}`}
                        >
                            <p>{label}</p>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default Navigation;