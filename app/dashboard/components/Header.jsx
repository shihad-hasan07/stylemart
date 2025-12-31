"use client";
import { CgProfile } from "react-icons/cg";
import { useSidebar } from "./Sidebar/sidebarContext/sidebarContext";
import { RiMenu2Line, RiSearchLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { BsArrowLeftShort } from "react-icons/bs";
import Link from "next/link";

export default function Header({ info }) {
    const { user, logOut } = info
    const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

    const boxRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (boxRef.current && !boxRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <header className="relative z-50 h-[70px] md:h-[80px] px-4 flex items-center justify-between  border-b border-gray-300">

            <div className="flex gap-2 items-center">
                {/* hamburger--- device-- lg */}
                <div onClick={toggleSidebar}
                    className="cursor-pointer hidden lg:block border border-gray-300 rounded-md py-2 px-3">
                    <RiMenu2Line className=" text-gray-500" size={25} />
                </div>

                {/* hamburger--- device-- sm */}
                <div onClick={toggleMobileSidebar} className="cursor-pointer lg:hidden  py-2.5 px-2.5">
                    {
                        isMobileOpen ? <RxCross2 className=" text-gray-500" size={25} />
                            : <RiMenu2Line className=" text-gray-500" size={25} />
                    }
                </div>

                {/* search bar */}
                <div className="hidden relative lg:flex">
                    <RiSearchLine size={25} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-500" />
                    <input type="search" name="" id="" accessKey="k" placeholder="Search or type command..."
                        className="2xl:w-[420px] w-[300px] border border-gray-300 rounded-md pr-[70px] pl-12 py-[9px] outline-black/40 placeholder:text-gray-400 placeholder:text-sm 2xl:placeholder:text-md " />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 border border-gray-300 rounded px-2 py-0.5 bg-gray-50">
                        Alt + K
                    </span>
                </div>
            </div>

            {/* shop logo */}
            <div className="w-27 lg:hidden">
                <img src="/logo.png" className="w-full h-full object-cover" alt="" />
            </div>

            {/* Admin account  */}
            <div className="px-3 cursor-pointer flex items-center gap-1" onClick={() => setIsOpen(!isOpen)}>
                <div className="relative rounded-full mr-1 w-9 sm:w-10 lg:w-11 h-9 sm:h-10 lg:h-11">
                    <Image
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                        unoptimized={true}
                        loading="lazy"
                        priority={false}
                        src={
                            user?.photoURL &&
                                user.photoURL !== "null" &&
                                user.photoURL !== ""
                                ? user.photoURL
                                : "/userNull.jpg"
                        }
                        alt={user?.displayName || "User"}
                        fill
                        className="object-cover rounded-full"
                    />

                </div>
                <p className=" text-xs sm:text-sm lg:text-md  font-medium">
                    {user.displayName ? user.displayName.slice(0, 15) : 'Account'}
                    {user?.displayName?.length > 17 && '...'}
                </p>
                <span className="text-gray-500">
                    {
                        isOpen ? <IoIosArrowUp size={21} /> : <IoIosArrowDown size={21} />
                    }
                </span>
            </div>

            {
                isOpen &&
                <div ref={boxRef}
                    className=" font-medium text-black/90 w-[250px] wrap-anywhere
                      absolute right-0 top-20 border rounded-lg border-gray-300 bg-white p-4 mr-6">

                    <p className="">{user?.displayName}</p>
                    <p className="text-sm">{user?.email}</p>
                    <hr className=" border-b border-gray-300 my-3" />
                    <Link href='/'>
                        <div className='flex items-center cursor-pointer gap-1.5 hover:bg-gray-200 px-2 py-1.5 rounded-md'>
                            <BsArrowLeftShort size={28} className="-ml-1" />
                            <span >Back to Store</span>
                        </div>
                    </Link>
                    <p onClick={logOut} className="flex items-center cursor-pointer gap-1.5 hover:bg-gray-200 px-2 py-1.5 rounded-md"><CiLogout size={21} /> <span>Logout</span></p>
                </div>
            }


        </ header>
    );
}
