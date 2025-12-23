import { Jost } from 'next/font/google'
import "./globals.css";
import ReduxProvider from '@/redux/ReduxProvider';
import Authprovider from '@/Auth/Authprovider';
import 'react-toastify/dist/ReactToastify.css';
import ToastProvider from '@/components/shared/ToastProvider';


const jost = Jost({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-jost',
})

export const metadata = {
    title: "styleMart",
    description: "Shop the latest fashion trends at StyleMart — your ultimate online destination for stylish clothing, footwear, and accessories. Discover exclusive collections for men, women, and kids with fast delivery, secure checkout, and unbeatable prices.",
};

export default function MainLayout({ children }) {
    return (
        <html lang="en">
            <body className={` ${jost.variable}`}>
                <Authprovider>
                    <ReduxProvider>
                        <ToastProvider />
                        <div>
                            {children}
                        </div>
                    </ReduxProvider>
                </Authprovider>
            </body>
        </html>
    );
}