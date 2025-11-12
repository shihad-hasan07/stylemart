import { Jost } from 'next/font/google'
import "./globals.css";
import TopNavbar from '@/components/shared/Navbar/TopNavbar';
import MidNavbar from '@/components/shared/Navbar/MidNavbar';
import Footer from '@/components/shared/Footer';
import ReduxProvider from '@/redux/ReduxProvider';

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
      <body className={jost.variable}>

        <ReduxProvider>

          <TopNavbar /><MidNavbar />
          <div className='min-h-[305px]'>
            {children}
          </div>
          <Footer />

        </ReduxProvider>

      </body>
    </html>
  );
}