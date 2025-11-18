'use client'
import { allContext } from '@/Auth/Authprovider';
import React, { useContext } from 'react';

const Account_header = () => {
    const {user}=useContext(allContext)
    return (
        <div className='flex w-full flex-col md:flex-row gap-4 items-center justify-between'>

            <div className='flex gap-4 items-center'>
                <div className='w-[70px] h-[70px]  rounded-full flex items-center justify-center'>
                    <img src={`${user ? user?.photoURL : '/userNull.jpg'}`} className='w-full h-full object-cover rounded-full ' alt="profile" />
                </div>
                <div>
                    <p className='text-[14px]'>Hello,</p>
                    <p className='text-[22px]'>{user?.displayName}</p>
                </div>
            </div>

            <div className='flex w-full min-[520px]:w-[250px] border-t border-t-gray-200 min-[520px]:border-t-0 pt-4 justify-around text-gray-700 text-center gap-10'>
                <div>
                    <p>Cart items</p>
                    <p className='text-[22px] mt-0.5 text-red-600 font-medium'>{10}</p>
                </div>
                <div className='border opacity-15'></div>
                <div>
                    <p>Wishlist items</p>
                    <p className='text-[22px] mt-0.5 text-red-600 font-medium'>{0}</p>
                </div>
            </div>
        </div>
    );
};

export default Account_header;