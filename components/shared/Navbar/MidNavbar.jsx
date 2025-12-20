'use client'
import { Heart, ShoppingCart, UserRound } from "lucide-react";
import { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { allContext } from "@/Auth/Authprovider";
import LeftSide_modal from "../LeftSide_modal";
import BottomNavbar from "./BottomNavbar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MidNavbar = () => {
    const { user, loading, logOut } = useContext(allContext)
    const { cartProducts, totalItems, totalPrice } = useSelector(state => state.cart)
    const { wishlistProducts } = useSelector(state => state.wishlist)
    const router = useRouter()

    const queryhandler = (query) => {
        router.push(`/shop?category=${query}`)
    }
    const [isOpen, setisOpen] = useState(false)
    const handleModal = () => {
        setTimeout(() => {
            setisOpen(!isOpen)
        }, 100)
    }
    return (
        <div>
            {/* for large device */}
            <div className=" hidden xl:flex container mx-auto px-20 pt-5 pb-4 justify-between items-center  w-full">
                <div className="flex items-center gap-6">
                    <div>
                        <Link href='/'>
                            <img src="/logo.png" className='w-80' alt="" />
                        </Link>
                    </div>

                    {/* hamburger */}
                    <div
                        onClick={handleModal}
                        className=" cursor-pointer px-3 py-2.5 flex  border border-[#c2c9c3] rounded-[2] items-center gap-1.5">
                        <RxHamburgerMenu size={26} /> <p>Menu</p>
                    </div>
                </div>
                <div className="w-full ml-4">
                    <input type="text" name="" className="p-3 w-full bg-[#eceef0]" placeholder="Search for products..." />
                </div>
                <div className="flex items-center gap-2">

                    {/* user */}
                    <div className=" ml-6">
                        {
                            loading ?
                                <div className="flex flex-row gap-2">
                                    <div className="animate-pulse bg-gray-300 w-9 h-9 rounded-full"></div>
                                    <div className="flex flex-col gap-2.5">
                                        <div className="animate-pulse bg-gray-300 w-18 h-3.5 rounded-full"></div>
                                        <div className="animate-pulse bg-gray-300 w-26 h-3.5 rounded-full"></div>
                                    </div>
                                </div>
                                :
                                <div className="flex items-center gap-1.5">
                                    {
                                        user && (
                                            <Link href='/my-account'>
                                                <div className="w-[45px] h-[45px] rounded-full overflow-hidden relative">
                                                    <Image
                                                        src={user.photoURL || '/userNull.jpg'}
                                                        alt={user.displayName || 'User'}
                                                        fill
                                                        className="object-cover"
                                                        priority
                                                        onError={(e) => {
                                                            e.target.srcset = '/userNull.jpg';
                                                        }}
                                                    />
                                                </div>
                                            </Link>
                                        )
                                    }
                                    <div>
                                        <Link href={`${user ? '/my-account' : '/login'}`}>
                                            <p className="text-sm font-semibold">
                                                {
                                                    user ?
                                                        <span>
                                                            {user.displayName ? user.displayName.slice(0, 19) : 'Account'}
                                                            {user?.displayName?.length > 19 && '...'}
                                                        </span>
                                                        : 'Account'
                                                }
                                            </p>
                                        </Link>
                                        {
                                            user == (undefined || null) ?
                                                <div className="flex text-sm gap-1 font-medium">
                                                    <Link href='/register'><p className="hover:text-red-600">Register</p></Link>
                                                    or
                                                    <Link href='/login'><p className="hover:text-red-600">Login</p></Link>
                                                </div>
                                                : <div className="flex text-sm gap-1 font-medium">
                                                    <Link href='/my-account'><p className="hover:text-red-600">Profile</p></Link>
                                                    or
                                                    <p onClick={() => logOut()} className="cursor-pointer hover:text-red-600">Logout</p>
                                                </div>

                                        }
                                    </div>
                                </div>
                        }
                    </div>

                    {/* wishlist */}
                    <div className="relative mx-4 cursor-pointer">
                        <Link href='/wishlist'>
                            <Heart size={30} strokeWidth={2} />
                            <p className="absolute -top-1 -right-1.5 w-[17px] h-[17px] text-[12px] bg-[#ee403d] text-white flex items-center justify-center rounded-full">
                                {wishlistProducts?.length}</p>
                        </Link>
                    </div>

                    {/* cart */}
                    <Link href='/cart' className="flex items-center gap-1.5">
                        <div className="relative mr-1 cursor-pointer">
                            <ShoppingCart size={30} strokeWidth={2} />
                            <p className="absolute -top-1 -right-1.5 w-[17px] h-[17px] text-[12px] bg-[#ee403d] text-white flex items-center justify-center rounded-full">
                                {totalItems}</p>
                        </div>
                        <div className="flex flex-col cursor-pointer">
                            <p className="text-sm font-medium">Total</p>
                            <p className="text-sm font-semibold">৳{totalPrice}</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="hidden xl:flex gap-8 mb-2 mt-2 text-[16px] font-[450] container mx-auto px-20 ">
                <Link href='/'><p>Home</p></Link>
                <Link href='/shop'><p>Shop</p></Link>
                <button onClick={() => queryhandler('Women')} className="cursor-pointer"><p>Women</p></button>
                <button onClick={() => queryhandler('Men')} className="cursor-pointer" ><p>Men</p></button>
                <button onClick={() => queryhandler('Outerwear')} className="cursor-pointer"><p>Outerwear</p></button>
                <Link href='/'><p>Blog</p></Link>
                <Link href='/'><p>Best Discount</p></Link>
            </div>

            {/* for small device */}
            <div className="xl:hidden flex justify-between items-center container  mx-auto px-5 pt-2 sm:pt-3">
                <RxHamburgerMenu onClick={handleModal} className="cursor-pointer" size={26} />
                <div><img src="/smallogo.png" className="h-10 sm:h-14 " alt="" /></div>
                <Link href='/cart'>
                    <div className="relative mr-1 cursor-pointer">
                        <ShoppingCart size={30} strokeWidth={2} />
                        <p className="absolute -top-1 -right-1.5 w-[17px] h-[17px] text-[12px] bg-[#ee403d] text-white flex items-center justify-center rounded-full">
                            {totalItems}</p>
                    </div>
                </Link>
            </div>

            <LeftSide_modal isOpen={isOpen} setisOpen={setisOpen} handleModal={handleModal} />

            <hr className="opacity-10" />

            <BottomNavbar handleModal={handleModal} />
        </div >
    );
};

export default MidNavbar;