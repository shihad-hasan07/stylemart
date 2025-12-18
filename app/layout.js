import { Jost } from 'next/font/google'
import "./globals.css";
import TopNavbar from '@/components/shared/Navbar/TopNavbar';
import MidNavbar from '@/components/shared/Navbar/MidNavbar';
import Footer from '@/components/shared/Footer';
import ReduxProvider from '@/redux/ReduxProvider';
import Authprovider from '@/Auth/Authprovider';
import 'react-toastify/dist/ReactToastify.css';
import ToastProvider from '@/components/shared/ToastProvider';
import WishlistModal from '@/components/shared/wishlist/WishlistModal';


const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
})

export const metadata = {
  title: "styleMart",
  description: "Shop the latest fashion trends at StyleMart — your ultimate online destination for stylish clothing, footwear, and accessories. Discover exclusive collections for men, women, and kids with fast delivery, secure checkout, and unbeatable prices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${jost.variable}`}>
        <Authprovider>
          <ReduxProvider>
            <ToastProvider />
            <TopNavbar />
            <MidNavbar />
            <div className='min-h-[305px]'>
              {children}
              <WishlistModal />
            </div>
            <Footer />
          </ReduxProvider>
        </Authprovider>
      </body>
    </html>
  );
}