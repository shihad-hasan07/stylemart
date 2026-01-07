"use client";
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
    const { user, logOut } = info;
    const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

    const boxRef = useRef(null);
    const buttonRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (
                boxRef.current && 
                !boxRef.current.contains(e.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };
        
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const handleToggle = (e) => {
        e.stopPropagation();
        setIsOpen(prev => !prev);
    };

    return (
        <header className="relative z-50 h-[80px] md:h-[80px] px-4 flex items-center justify-between border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="flex gap-2 items-center">
                {/* hamburger--- device-- lg */}
                <div 
                    onClick={toggleSidebar}
                    className="cursor-pointer hidden lg:block border border-gray-200 rounded-lg py-2 px-3 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 active:scale-95"
                >
                    <RiMenu2Line className="text-gray-600" size={25} />
                </div>

                {/* hamburger--- device-- sm */}
                <div 
                    onClick={toggleMobileSidebar} 
                    className="cursor-pointer lg:hidden py-2.5 px-2.5 hover:bg-gray-100 rounded-lg transition-all duration-200 active:scale-95"
                >
                    {isMobileOpen ? (
                        <RxCross2 className="text-gray-600" size={25} />
                    ) : (
                        <RiMenu2Line className="text-gray-600" size={25} />
                    )}
                </div>

                {/* search bar */}
                <div className="hidden relative lg:flex">
                    <RiSearchLine 
                        size={20} 
                        className="absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-400" 
                    />
                    <input 
                        type="search" 
                        accessKey="k" 
                        placeholder="Search or type command..."
                        className="2xl:w-[420px] w-[300px] bg-gray-50/50 border border-gray-200 rounded-lg pr-[70px] pl-12 py-[9px] outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 placeholder:text-gray-400 placeholder:text-sm 2xl:placeholder:text-md transition-all duration-200"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 border border-gray-200 rounded-md px-2 py-1 bg-white/80 backdrop-blur-sm shadow-sm">
                        Alt + K
                    </span>
                </div>
            </div>

            {/* shop logo */}
            <div className="w-27 lg:hidden">
                <img src="/logo.png" className="w-full h-full object-cover" alt="Logo" />
            </div>

            {/* Admin account */}
            <div 
                ref={buttonRef}
                className="px-3 py-2 cursor-pointer flex items-center gap-1 select-none hover:bg-gray-50 rounded-lg transition-all duration-200" 
                onClick={handleToggle}
            >
                <div className="relative rounded-full mr-1 w-9 sm:w-10 lg:w-11 h-9 sm:h-10 lg:h-11 ring-2 ring-gray-200 ring-offset-2">
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
                <p className="text-xs sm:text-sm lg:text-md font-semibold text-gray-800">
                    {user?.displayName ? user.displayName.slice(0, 15) : 'Account'}
                    {user?.displayName?.length > 15 && '...'}
                </p>
                <span className="text-gray-400 ml-0.5">
                    {isOpen ? <IoIosArrowUp size={18} /> : <IoIosArrowDown size={18} />}
                </span>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div 
                    ref={boxRef}
                    className="font-medium text-black/90 w-[270px] break-words absolute right-0 top-20 border border-gray-200 rounded-xl bg-white p-3 mr-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
                >
                    {/* User Info with gradient background */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-3 mb-3">
                        <p className="font-semibold text-gray-900 truncate text-sm">{user?.displayName}</p>
                        <p className="text-xs text-gray-600 truncate mt-0.5">{user?.email}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="space-y-1">
                        <Link href="/">
                            <div className="flex items-center cursor-pointer gap-2.5 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50 px-3 py-2.5 rounded-lg transition-all duration-200 group">
                                <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm group-hover:shadow-md transition-all">
                                    <BsArrowLeftShort size={22} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
                                </div>
                                <span className="text-sm text-gray-700 group-hover:text-blue-700 font-medium">Back to Store</span>
                            </div>
                        </Link>

                        <div 
                            onClick={logOut} 
                            className="flex items-center cursor-pointer gap-2.5 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100/50 px-3 py-2.5 rounded-lg transition-all duration-200 group"
                        >
                            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm group-hover:shadow-md transition-all">
                                <CiLogout size={18} className="text-gray-600 group-hover:text-red-600 transition-colors" />
                            </div>
                            <span className="text-sm text-gray-700 group-hover:text-red-700 font-medium">Logout</span>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}