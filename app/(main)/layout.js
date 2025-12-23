import TopNavbar from '@/components/shared/Navbar/TopNavbar';
import MidNavbar from '@/components/shared/Navbar/MidNavbar';
import Footer from '@/components/shared/Footer';
import 'react-toastify/dist/ReactToastify.css';
import WishlistModal from '@/components/shared/wishlist/WishlistModal';



export default function MainLayout({ children }) {
  return (
    <>
      <TopNavbar />
      <MidNavbar />
      <div className=' min-h-[305px]'>
        {children}
        <WishlistModal />
      </div>
      <Footer />
    </>
  );
}