'use client'
import { Heart, ShoppingCart, UserRound } from "lucide-react";
import { useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import Link from "next/link";
import { FaPaperPlane } from "react-icons/fa";
import { useRouter } from "next/navigation";


const LeftSide_modal = ({ isOpen, setisOpen, handleModal }) => {
    const router = useRouter()

    const queryhandler = (query) => {
        router.push(`/shop?category=${query}`)
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
            {/* left side modal */}
            <div className={`overflow-y-auto scrollbar-thin fixed top-0 left-0 h-full w-[320px] sm:w-[350px]
             bg-white shadow-2xl  transform transition-transform duration-300 ease-in-out z-50
                  ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >

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
                        <span onClick={() => queryhandler('Men')} className="cursor-pointer">Men</span>
                        <span onClick={() => queryhandler('Women')} className="cursor-pointer">Women</span>
                        <span onClick={() => queryhandler('Outerwear')} className="cursor-pointer">Outerwear</span>
                        <Link href='/'>Blog</Link>
                    </div>
                </div>

                <div className="px-5 pb-5">

                    {/* stylemart helps */}
                    <p className="text-xs mt-5 tracking-wider text-[#b9c5e1] font-normal">STYLEMART HELPS</p>
                    <div onClick={handleModal} className="text-[15px] pl-1.5 mt-3 flex flex-col font-[450] gap-4.5 tracking-wide">
                        <Link href='/' className="flex items-center gap-2"><span><Heart size={18} /></span>Wishlist</Link>
                        <Link href='/' className="flex items-center gap-2"><ShoppingCart size={18} />Shopping Cart</Link>
                        <Link href='/my-account' className="flex items-center gap-2"><UserRound size={18} />My Account</Link>
                        <Link href='/' className="flex items-center gap-2"><MdCall size={18} />Contact</Link>
                    </div>

                    {/* categories */}
                    <p className="text-xs mt-5 tracking-wider text-[#b9c5e1] font-normal">BROWSE CATEGORIES</p>
                    <div onClick={handleModal} className="text-[15px] pl-1.5 mt-3 flex flex-col font-[450] gap-4.5 tracking-wide">
                        <span onClick={() => queryhandler('Men')} className="cursor-pointer">Men</span>
                        <span onClick={() => queryhandler('Women')} className="cursor-pointer">Women</span>
                        <span onClick={() => queryhandler('Kids')} className="cursor-pointer">Kids</span>
                        <span onClick={() => queryhandler('Outerwear')} className="cursor-pointer">Outerwear</span>
                        <span onClick={() => queryhandler('Baby')} className="cursor-pointer">Baby</span>
                        <span onClick={() => queryhandler('Accessories')} className="cursor-pointer">Accessories</span>
                        <span onClick={() => queryhandler('Bags')} className="cursor-pointer">Bags</span>
                        <span onClick={() => queryhandler('Belts')} className="cursor-pointer">Belts</span>
                        <span onClick={() => queryhandler('Watches')} className="cursor-pointer">Watches</span>
                        <span onClick={() => queryhandler('Wallets')} className="cursor-pointer">Wallets</span>
                        <span onClick={() => queryhandler('Shoes')} className="cursor-pointer">Shoes</span>
                        <span onClick={() => queryhandler('Cargo Trousers')} className="cursor-pointer">Cargo Trousers</span>
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

export default LeftSide_modal;