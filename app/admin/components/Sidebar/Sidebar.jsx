"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./sidebarContext/sidebarContext";
import { Box, Ellipsis, House, LayoutDashboard, Settings, ShoppingCart, Tag, Users } from "lucide-react";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { BsArrowLeftShort } from "react-icons/bs";
import { ImHome } from "react-icons/im";

export default function Sidebar({ role }) {
    const { isExpanded, isMobileOpen, isHovered, activeItem,
        openSubmenu, toggleSidebar, toggleMobileSidebar,
        setIsHovered, setActiveItem, toggleSubmenu } = useSidebar();

    const shouldExpand = isMobileOpen || isExpanded || isHovered;

    const menu = [
        {
            name: "Dashboard",
            href: "/admin",
            icons: <LayoutDashboard className={`${activeItem == "Dashboard" ? 'text-blue-500' : 'text-gray-500'}`} />
        },
        {
            name: "Products",
            href: '/admin/products',
            icons: <Box className={`${activeItem == "Products" ? 'text-blue-500' : 'text-gray-500'}`} size={23} />
        },
        {
            name: "Orders",
            href: '/admin/orders',
            icons: <ShoppingCart className={`${activeItem == "Orders" ? 'text-blue-500' : 'text-gray-500'}`} />
        },
        {
            name: "Sales",
            href: '/admin/sales',
            icons: <Tag className={`${activeItem == "Sales" ? 'text-blue-500' : 'text-gray-500'}`} />
        },
        {
            name: "Customers",
            href: '/admin/customers',
            icons: <Users className={`${activeItem == "Customers" ? 'text-blue-500' : 'text-gray-500'}`} />
        },
        {
            name: "Settings",
            href: '/admin/settings',
            icons: <Settings className={`${activeItem == "Settings" ? 'text-blue-500' : 'text-gray-500'}`} />
        }
    ];
    return (
        <div className="shrink-0">

            {/* diplay blck overlay in small device */}
            {isMobileOpen && (<div onClick={toggleMobileSidebar} className="fixed top-20 left-0 right-0   bottom-0 bg-black/40 z-40 lg:hidden" />)}

            <aside onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                className={`fixed top-20 -mt-3 h-[calc(100vh-0rem)] lg:relative lg:top-0 lg:h-screen z-40 border-r bg-white border-gray-300 transition-all duration-300 ease-in-out
                ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} ${shouldExpand ? "w-64" : "w-20"}`}
            >

                {/* user status admin---manager---staff */}
                <div className="flex items-center px-3 mt-4 h-[70px]">
                    {/* owner */}
                    {
                        role == "admin" &&
                        <div className="flex items-center gap-2.5">
                            <div className={` w-9 shrink-0 h-9 bg-[#3a2f5a] rounded-full transition-all duration-300
                                ${shouldExpand ? 'translate-x-2' : 'translate-x-2'}`}>
                                <img src="/dashboard/owner.jpg" className="w-full h-full  rounded-xl object-cover" alt="admin" />
                            </div>
                            <p className={` w-44 text-xl font-medium transition-all duration-300 delay-75 ease-out
                                ${shouldExpand ? 'opacity-100 translate-x-2' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
                                Store Administrator
                            </p>
                        </div>
                    }

                    {/* mangaer */}
                    {
                        role == "manager" &&
                        <div className="flex items-center gap-2.5">
                            <div className={` w-9 shrink-0 h-9 bg-[#3a2f5a] rounded-full transition-all duration-300
                                ${shouldExpand ? 'translate-x-2' : 'translate-x-2'}`}>
                                <img src="/dashboard/manager.png" className="w-full h-full  rounded-xl object-cover" alt="admin" />
                            </div>
                            <p className={` w-40 text-xl font-medium transition-all duration-300 delay-75 ease-out
                                ${shouldExpand ? 'opacity-100 translate-x-2' : 'opacity-0 -translate-x-2 pointer-events-none'}`}>
                                Store Manager
                            </p>
                        </div>
                    }

                    {/* staff */}
                    {
                        role == 'staff' &&
                        <div className="flex items-center gap-2.5">
                            <div className={` w-9 p-[9px] shrink-0 h-9 bg-[#3a2f5a] rounded-xl transition-all duration-300 bg-gradient-to-b from-[#9edd56] to-[#7c7e1c]
                                ${shouldExpand ? 'translate-x-2' : 'translate-x-2'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-full h-full  text-[#fcffff]" fill="currentColor"> <path d="M64 128a112 112 0 1 1 224 0 112 112 0 1 1 -224 0zM0 464c0-97.2 78.8-176 176-176s176 78.8 176 176l0 6c0 23.2-18.8 42-42 42L42 512c-23.2 0-42-18.8-42-42l0-6zM432 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm0 240c79.5 0 144 64.5 144 144l0 22.4c0 23-18.6 41.6-41.6 41.6l-144.8 0c6.6-12.5 10.4-26.8 10.4-42l0-6c0-51.5-17.4-98.9-46.5-136.7 22.6-14.7 49.6-23.3 78.5-23.3z" /> </svg>
                            </div>
                            <p className={` w-40 text-xl font-medium transition-all duration-300 delay-75 ease-out
                                ${shouldExpand ? 'opacity-100 translate-x-2' : 'opacity-0 -translate-x-2 pointer-events-none'}`}>
                                Sales Executive
                            </p>
                        </div>
                    }
                </div>

                {/* back to home */}
                <House className={`text-gray-600  p-1 transition-all duration-300 ${shouldExpand ? 'opacity-0 translate-x-3 translate-y-4 ' : '-mt-2 opacity-100  translate-x-5 translate-y-4.5 mb-7'}`} size={34} />
                <Link href='/'>
                    <div className={`flex -mt-3.5 hover:bg-gray-100 rounded-xl py-2.5 px-1 items-center mx-3 transition-all duration-300 ${shouldExpand ? 'opacity-100 -translate-y-3 h-fit ' : 'opacity-0 -translate-y-3 h-0'}`}>
                        <BsArrowLeftShort size={28} className="text-gray-600" />
                        <span className=" text-md font-[450] text-gray-800">Back to Store</span>
                    </div>
                </Link>

                <p className={` text-gray-400 text-sm font-medium ml-4 transition-transform duration-300 pl-1 ${shouldExpand ? 'opacity-100 translate-x-0 -mt-0.5' : 'opacity-0 -translate-x-1 mt-1.5'}`}>MENU</p>
                <Ellipsis className={`text-gray-500 ml-4 ${shouldExpand ? 'opacity-0 translate-x-0 translate-y-5' : 'opacity-100 translate-x-2  -translate-y-6'}`} />

                {/* Menu */}
                <div className={`flex flex-col gap-y-2.5 overflow-hidden duration-300 mx-2 ${shouldExpand ? '-translate-y-3.5 ' : '-translate-y-4 -translate-x-0.5'}`}>
                    {menu.map((item) => (
                        <Link key={item.name} href={item.href} >
                            <div onClick={() => setActiveItem(item.name)}
                                className={`flex items-center h-12  rounded-xl cursor-pointer transition-all ${activeItem !== item.name && "hover:bg-gray-100"}
                                ${shouldExpand ? `mx-2 px-5 gap-3 ${activeItem == item.name && 'bg-[#ecf3ff]'}` : "w-fit ml-6 justify-center"}
                                `}
                            >
                                <div className={`text-xl shrink-0 flex items-center justify-center w-6 duration-300 transition-all
                                    ${shouldExpand ? " -translate-x-1.5" : " -translate-x-1.5"}`}>
                                    {item.icons}
                                </div>

                                <span className={` text-md font-[450]  whitespace-nowrap transition-all duration-300 ${activeItem == item.name ? 'text-blue-600' : 'text-gray-800'}
                                        ${shouldExpand ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 pointer-events-none"}`}>
                                    {item.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>





                {/* <div>
                    Administrator
                    <br />
                    Manager
                    <br />
                    Executive
                </div> */}
            </aside >
        </div>
    );
}
