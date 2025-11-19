'use client'
import { Heart } from 'lucide-react';
import { IoSearchOutline } from 'react-icons/io5';
import { RiStore2Line } from "react-icons/ri";
import { VscAccount } from 'react-icons/vsc';
import { PiListBullets } from "react-icons/pi";
import Link from 'next/link';
import { useContext } from 'react';
import { allContext } from '@/Auth/Authprovider';
import { usePathname } from 'next/navigation';
import { LiaHomeSolid } from "react-icons/lia";
import { FiFilter } from "react-icons/fi";

const BottomNavbar = ({ handleModal }) => {
    const { user } = useContext(allContext)
    const pathname = usePathname()
    console.log(pathname);

    return (
        <div className="fixed lg:hidden flex px-3.5 sm:px-10 pt-3.5 pb-2 justify-between  bottom-0 w-full text-[13px] shadow-2xs drop-shadow-2xl bg-gray-100 rounded-t-3xl z-40">
            {
                pathname == '/shop'
                    ?
                    <Link href='/'>
                        <p className='flex flex-col items-center justify-between gap-0.5 text-gray-700'>
                            <LiaHomeSolid size={24} />
                            <span>Home</span>
                        </p>
                    </Link>
                    :
                    <Link href='/shop'>
                        <p className='flex flex-col items-center justify-between gap-0.5 text-gray-700'>
                            <RiStore2Line size={23} />
                            <span>Store</span>
                        </p>
                    </Link>
            }


            {/* filter  */}
            {
                pathname == '/shop' &&
                <p className='cursor-pointer flex flex-col items-center justify-between gap-0.5 text-gray-700'>
                    <FiFilter size={24} />
                    <span>Filter</span>
                </p>
            }

            {/* search  */}
            <p className='cursor-pointer flex flex-col items-center justify-between gap-0.5 text-gray-700'>
                <IoSearchOutline size={26} />
                <span>Search</span>
            </p>

            {/* wishlist */}
            <p className='cursor-pointer flex flex-col items-center justify-between gap-0.5 text-gray-700'>
                <Heart size={24} className='opacity-80' />
                <span>Wishlist</span>
            </p>

            <Link href={`${user ? '/my-account' : '/login'}`}>
                <p className='flex flex-col items-center justify-between gap-0.5 text-gray-700'>
                    <VscAccount size={23} />
                    <span>Account</span>
                </p>
            </Link>

            {
                pathname !== '/shop' &&
                <p onClick={handleModal} className='cursor-pointer flex flex-col items-center justify-between gap-0.5 text-gray-700'>
                    <PiListBullets size={26} />
                    <span>Categories</span>
                </p>
            }
        </div>
    );
};

export default BottomNavbar;