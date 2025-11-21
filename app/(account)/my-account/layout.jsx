'use client'
import { allContext } from "@/Auth/Authprovider";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { VscAccount } from "react-icons/vsc";
import { IoIosHeartEmpty } from "react-icons/io";
import { FiLogOut, FiShoppingBag } from "react-icons/fi";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

export default function Layout({ children }) {
    const { user, loading, logOut } = useContext(allContext)
    const [isactive, setIsactive] = useState('')
    const [menu, setMenu] = useState(false)

    console.log(user?.photoURL);

    useEffect(() => {
        const checkScreen = () => {
            if (window.innerWidth >= 1024) {
                setMenu(false);
            } else {
                setMenu(true)
            }
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    }, []);
    return (
        <div className='container mx-auto px-5 xl:px-20'>
            <h2 className="text-4xl mt-7">My Account</h2>

            <div className="flex flex-col lg:flex-row my-5 gap-0">
                <div className="w-full lg:w-[250px]">

                    {/* user info */}
                    <div className="flex gap-1.5 justify-between items-center">
                        <Link href='/my-account' onClick={() => setIsactive('')}>
                            <div className='flex gap-4 items-center'>
                                <div className='w-[50px] h-[50px] rounded-full flex items-center justify-center'>
                                    <img
                                        src={`${user?.photoURL ? user.photoURL : '/userNull.jpg'}`}
                                        className='w-full h-full object-cover rounded-full'
                                        alt="profile"
                                    />
                                </div>
                                <div>
                                    <p className='text-[13px] text-gray-400'>Welcome back,</p>
                                    <p className='text-[18px] font-medium'>{user?.displayName}</p>
                                </div>
                            </div>
                        </Link>

                        <div className="flex lg:hidden" onClick={() => setMenu(!menu)}>
                            {
                                !menu ?
                                    <RxCross1 size={26} />
                                    :
                                    <RxHamburgerMenu size={26} />
                            }
                        </div>
                    </div>

                    {/* navigation sidebar */}
                    <div className={`transition-all duration-300 overflow-hidden
                        ${!menu ? "opacity-100 max-h-96 translate-y-3" : "opacity-0 max-h-0 -translate-y-1"}`}>

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
                                <IoIosHeartEmpty size={23} className="font-bold" />
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
                        <div onClick={() => logOut()} className="cursor-pointer flex items-center gap-2 py-3 pl-4">
                            <FiLogOut size={20} />
                            <p className="text-[16px] font-medium">Log out</p>
                        </div>
                        <hr className="opacity-10" />
                    </div>
                </div>

                {/* dynamically rendered routes */}
                <div>{children}</div>
            </div>
        </div>
    )
}
