'use client'
import { Divide, Heart } from 'lucide-react';
import { IoSearchOutline } from 'react-icons/io5';
import { RiStore2Line } from "react-icons/ri";
import { VscAccount } from 'react-icons/vsc';
import { PiListBullets } from "react-icons/pi";
import Link from 'next/link';
import { useContext } from 'react';
import { allContext } from '@/Auth/Authprovider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LiaHomeSolid } from "react-icons/lia";
import { FiFilter } from "react-icons/fi";
import { IoIosLogIn } from 'react-icons/io';
import { LuLayoutDashboard } from "react-icons/lu";


const ALLOWED_ROLES = ['admin', 'manager', 'staff'];

const BottomNavbar = ({ handleModal }) => {
    const { user, loading, dbUserLoading, userfromDB, logOut } = useContext(allContext)

    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const openFilter = () => {
        const newParams = new URLSearchParams(params.toString());
        newParams.set("isFilterOpen", "true");

        router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    };

    return (
        <div className="fixed lg:hidden flex px-3.5 sm:px-10 pt-3.5 pb-2 justify-between items-center bottom-0 w-full text-[13px] shadow-2xs drop-shadow-2xl bg-gray-100 rounded-t-3xl z-40">
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
                <p onClick={openFilter} className='cursor-pointer flex flex-col items-center justify-between gap-0.5 text-gray-700'>
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
            <Link href='/wishlist'>
                <p className='cursor-pointer  flex flex-col items-center justify-between gap-0.5 text-gray-700'>
                    <Heart size={24} className='opacity-80' />
                    <span>Wishlist</span>
                </p>
            </Link>

            {/* user account */}

            {
                user ?
                    <div className=' -mx-3'>
                        {
                            dbUserLoading ?
                                <div className="w-8 h-8 border-red-800 border-t-2 border-r-2 border-double rounded-full animate-spin"></div>
                                : (ALLOWED_ROLES.includes(userfromDB?.role)
                                    ?
                                    <Link href="/dashboard">
                                        <p className='flex flex-col items-center justify-between gap-0.5 text-gray-700'>
                                            <LuLayoutDashboard className='text-gray-500' size={23} />
                                            <span>Dashboard</span>
                                        </p>
                                    </Link>
                                    : <Link href='/my-account'>
                                        <p className='flex flex-col items-center justify-between gap-0.5 text-gray-700'>
                                            <VscAccount size={23} />
                                            <span>Account</span>
                                        </p>
                                    </Link>
                                )
                        }
                    </div>
                    : <Link href='/login'>
                        <p className='flex flex-col items-center justify-between gap-0.5 text-gray-700'>
                            <IoIosLogIn size={24} />
                            <span>Login</span>
                        </p>
                    </Link>
            }

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