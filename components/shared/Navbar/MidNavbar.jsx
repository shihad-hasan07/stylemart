'use client'
import { Heart, ShoppingCart, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import Link from "next/link";
import { FaPaperPlane } from "react-icons/fa";

const MidNavbar = () => {
    const [isOpen, setisOpen] = useState(false)

    const handleModal = () => {
        setTimeout(() => {
            setisOpen(!isOpen)
        }, 100)
    }

    //  body er scroll bar ta handle krar jonno
    useEffect(() => {
        isOpen ?
            document.body.style.overflow = 'hidden'
            :
            document.body.style.overflow = 'unset'

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <div>

            {/* for large device */}
            <div className="hidden xl:flex container mx-auto px-20 pt-5 pb-4 justify-between items-center  w-full">
                <div className="flex items-center gap-6">
                    <div>
                        <img src="/logo.png" className='w-80' alt="" />
                    </div>

                    {/* hamburger */}
                    <div
                        onClick={handleModal}
                        className=" cursor-pointer px-3 py-2.5 flex  border border-[#c2c9c3] rounded-[2] items-center gap-1.5">
                        <RxHamburgerMenu size={26} /> <p>Menu</p>
                    </div>
                </div>
                <div className="w-full ml-4">
                    <input type="text" name="" className="p-3 w-full bg-[#eceef0]" placeholder="Serch for products..." />
                </div>
                <div className="flex items-center gap-2">

                    {/* user */}
                    <div className="flex items-center ml-6 gap-1.5">
                        <UserRound size={28} strokeWidth={2} />
                        <div>
                            <p className="text-xs">Sign in</p>
                            <p className="text-sm font-semibold">Account</p>
                        </div>
                    </div>

                    {/* wishlist */}
                    <div className="relative mx-4  cursor-pointer">
                        <Heart size={30} strokeWidth={2} />
                        <p className="absolute -top-1 -right-1.5 w-[17px] h-[17px] text-[12px] bg-[#ee403d] text-white flex items-center justify-center rounded-full">
                            9</p>
                    </div>

                    {/* cart */}
                    <div className="relative mr-1 cursor-pointer">
                        <ShoppingCart size={30} strokeWidth={2} />
                        <p className="absolute -top-1 -right-1.5 w-[17px] h-[17px] text-[12px] bg-[#ee403d] text-white flex items-center justify-center rounded-full">
                            9</p>
                    </div>
                    <div className="flex flex-col cursor-pointer">
                        <p className="text-xs">Total</p>
                        <p className="text-sm font-semibold">৳100</p>
                    </div>
                </div>

            </div>

            {/* for small device */}
            <div className="xl:hidden flex justify-between items-center container  mx-auto px-10 py-2 sm:py-3">
                <RxHamburgerMenu onClick={handleModal} className="cursor-pointer" size={26} />
                <div><img src="/smallogo.png" className="h-10 sm:h-14 " alt="" /></div>
                <div className="relative mr-1 cursor-pointer">
                    <ShoppingCart size={30} strokeWidth={2} />
                    <p className="absolute -top-1 -right-1.5 w-[17px] h-[17px] text-[12px] bg-[#ee403d] text-white flex items-center justify-center rounded-full">
                        9</p>
                </div>
            </div>


            {/* left side modal */}
            <div className={`overflow-y-auto scrollbar-thin fixed top-0 left-0 h-full w-[350px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-5 flex  justify-between items-center">
                    <img src="/logo.png" className="h-14" alt="" />
                    <IoCloseSharp onClick={handleModal} className="cursor-pointer" size={34} />
                </div>
                <hr className="opacity-15" />

                {/* main menu */}
                <div className="px-5 pt-5">
                    <p className="text-xs tracking-wider text-[#b9c5e1] font-normal">MAIN MENU</p>
                    <div onClick={handleModal} className="text-[15px] pl-1.5 mt-3 flex flex-col font-[450] gap-4.5 tracking-wide">
                        <Link href='/'>Home</Link>
                        <Link href='/shop'>Shop</Link>
                        <Link href='/faq'>Women</Link>
                        <Link href='/'>Men</Link>
                        <Link href='/about-us'>Outerwear</Link>
                        <Link href='/'>Blog</Link>
                    </div>
                </div>

                <div className="px-5 pb-5">

                    {/* stylemart helps */}
                    <p className="text-xs mt-5 tracking-wider text-[#b9c5e1] font-normal">STYLEMART HELPS</p>
                    <div onClick={handleModal} className="text-[15px] pl-1.5 mt-3 flex flex-col font-[450] gap-4.5 tracking-wide">
                        <Link href='/' className="flex items-center gap-2"><span><Heart size={18} /></span>Wishlist</Link>
                        <Link href='/' className="flex items-center gap-2"><ShoppingCart size={18} />Shopping Cart</Link>
                        <Link href='/' className="flex items-center gap-2"><UserRound size={18} />My Account</Link>
                        <Link href='/' className="flex items-center gap-2"><MdCall size={18} />Contact</Link>
                    </div>

                    {/* categories */}
                    <p className="text-xs mt-5 tracking-wider text-[#b9c5e1] font-normal">BROWSE CATEGORIES</p>
                    <div onClick={handleModal} className="text-[15px] pl-1.5 mt-3 flex flex-col font-[450] gap-4.5 tracking-wide">
                        <Link href='/'>Women</Link>
                        <Link href='/about-us'>Men</Link>
                        <Link href='/faq'>Kids</Link>
                        <Link href='/'>Outerwear</Link>
                        <Link href='/about-us'> Baby</Link>
                        <Link href='/'>Accessories</Link>
                        <Link href='/'>Bags</Link>
                        <Link href='/'>Belts</Link>
                        <Link href='/'>Watches</Link>
                        <Link href='/'>Wallets</Link>
                        <Link href='/'>Shoes</Link>
                        <Link href='/'>Cargo Trousers</Link>
                    </div>
                    <hr className="opacity-15 my-5" />

                    {/* New / feature products */}
                    <div>
                        <p className="flex justify-between items-center text-[15px] font-[450] tracking-wide">New Products
                            <span className="bg-[#ced4da] rounded-xs px-2 py-0.5 text-xs text-white">NEW</span>
                        </p>
                        <p className="my-5 text-[15px] font-[450] tracking-wide ">Featured Products</p>
                        <p className="flex justify-between items-center text-[15px] font-[450] tracking-wide">Best Selling Products
                            <span className="bg-[#ced4da] rounded-xs px-2 py-0.5 text-xs text-white">FOR YOU</span>
                        </p>
                    </div>

                    <p className="text-xs mt-5 tracking-wider text-[#b9c5e1] font-normal">CONTACT DETAILS</p>
                    <div className="pl-1.5 mt-3 tracking-wide">
                        <p className="flex items-center gap-2 font-semibold"><span className="bg-black text-white p-0.5 rounded-xs"><MdCall /></span>555-555-5555</p>
                        <p className="text-xs opacity-80 mt-1.5">You can call anytime from 9 am to 6 am.</p>
                        <hr className="opacity-15 my-5" />

                        <p className="flex items-center gap-2 font-semibold"><span><FaPaperPlane size={19} /></span>shihadhasan7207@gmai.com</p>
                        <p className="text-xs opacity-80 mt-1.5">We will gladly assist you in the short time.</p>
                    </div>
                    <p className="text-xs mt-7 font-[450]"> Copyright 2025 ©StyleMart. All rights reserved by StyleMart.</p>
                </div>
            </div>

            {/* Overlay to handle closeModal */}
            {isOpen && (<div className={`fixed inset-0 bg-black z-40 transition-all duration-150 opacity-30`} onClick={() => setisOpen(false)}></div>)}

        </div>
    );
};

export default MidNavbar;