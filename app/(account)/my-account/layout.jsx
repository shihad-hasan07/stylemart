'use client'
import { allContext } from "@/Auth/Authprovider";
import Link from "next/link";
import { useContext, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { IoIosHeartEmpty } from "react-icons/io";
import { FiLogOut, FiShoppingBag } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function accountLayout({ children }) {
    const { user, logOut } = useContext(allContext)
    const [isactive, setIsactive] = useState('')

    const pathname = usePathname();
    console.log(pathname);

    return (
        <div className='container mx-auto px-5 xl:px-20'>
            <h2 className="text-4xl mt-7">My Account</h2>

            <div className="flex flex-col lg:flex-row my-5 gap-0">
                <div className="w-full lg:w-[250px]">
                    {/* user info */}
                    <Link href='/my-account' onClick={()=>setIsactive('')}>
                        <div className='flex gap-4 items-center'>
                            <div className='w-[50px] h-[50px]  rounded-full flex items-center justify-center'>
                                <img src={`${user ? user?.photoURL : '/userNull.jpg'}`} className='w-full h-full object-cover rounded-full ' alt="profile" />
                            </div>
                            <div>
                                <p className='text-[13px] text-gray-400'>Welcome back,</p>
                                <p className='text-[18px] font-medium'>{user?.displayName}</p>
                            </div>
                        </div>
                    </Link>

                    {/* navigation sidebar */}
                    <div className="flex flex-col mt-4">

                        {/* update profile */}
                        <Link onClick={() => setIsactive('/my-account/update-profile')} href='/my-account/update-profile'>
                            <div className={`${isactive == '/my-account/update-profile' && 'bg-gray-100'} flex items-center gap-2 py-3 pl-4`}>
                                <VscAccount size={20} />
                                <p className="text-[16px] font-medium">Update Account</p>
                            </div>
                        </Link>
                        <hr className="opacity-10" />

                        {/* wishlist */}
                        <Link onClick={() => setIsactive('/my-account/wishlist')} href='/my-account/wishlist'>
                            <div className={`${isactive == '/my-account/wishlist' && 'bg-gray-100'} flex items-center gap-2 py-3 pl-4`}>
                                <IoIosHeartEmpty size={23}  className="font-bold"/>
                                <p className="text-[16px] font-medium">Wishlist</p>
                            </div>
                        </Link>
                        <hr className="opacity-10" />
                        
                        {/* order */}
                        <Link onClick={() => setIsactive('/my-account/orders')} href='/my-account/orders'>
                            <div className={`${isactive == '/my-account/orders' && 'bg-gray-100'} flex items-center gap-2 py-3 pl-4`}>
                                <FiShoppingBag size={20} />
                                <p className="text-[16px] font-medium">orders</p>
                            </div>
                        </Link>
                        <hr className="opacity-10" />

                        {/* logOut */}
                        <div onClick={() => logOut()} className="cursor-pointer flex  items-center gap-2 py-3 pl-4">
                            <FiLogOut size={20} />
                            <p className="text-[16px] font-medium">Log out</p>
                        </div>
                        <hr className="opacity-10" />
                    </div>
                </div>

                {/* dynamically rendered routes */}
                <div>{children}</div>
            </div>
        </div>)
}