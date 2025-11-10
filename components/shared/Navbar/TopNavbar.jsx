import Link from 'next/link';
import React from 'react';
import { MdCall, MdOutlineCollectionsBookmark, MdOutlineLightMode } from "react-icons/md";

const TopNavbar = () => {
    return (
        <div className='bg-[#031424] hidden xl:flex text-white'>
            <div className='container flex justify-between items-center mx-auto px-20 py-2.5 text-[12px]'>
                <div className='flex items-center gap-3'>
                    <Link href='/'>
                        <div className='flex  items-center gap-1'>
                            <MdOutlineCollectionsBookmark />
                            <p>Track Order</p>
                        </div>
                    </Link>
                    <Link href='/about-us'><p>About Us</p></Link>
                    <Link href='/contact'><p>Contact</p></Link>
                    <Link href='/faq'><p>FAQ</p></Link>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-1'>
                        <MdCall />
                        <p>You can contact us 24/7 <span className='text text-[#fcc419]'>017895895</span></p>
                    </div>
                    <p>|</p>
                    <p>Eng</p>
                    <p>|</p>
                    <p>Bdt</p>
                    <p>|</p>
                    <button className='flex items-center gap-1'>
                        <MdOutlineLightMode />
                        <p>Light Theme</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopNavbar;