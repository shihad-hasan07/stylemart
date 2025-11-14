'use client'
import Product_details from '@/components/shopPage_components/Product_details';
import { useGetSingleProductQuery } from '@/redux/features/All_Products/_allProduct_api';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const page = () => {
    const { id, slug } = useParams()
    const { data: product = {}, isLoading, error } = useGetSingleProductQuery(id)

    return (
        <div className='container mx-auto px-5 xl:px-20  mt-2'>
            {/* navigation */}
            <div className='flex items-center gap-1 text-[14px] max-w-3/4'>
                <Link href='/'><p>Home</p></Link>
                <IoIosArrowForward />
                <Link href='/shop'><p>Shop</p></Link>
                <IoIosArrowForward />
                <Link href={`/shop/${id}/${slug}`} className='text-gray-400'><p>{slug}</p></Link>
            </div>
            {
                isLoading
                    ? <div className='text-4xl my-4 font-semibold'>Loading....</div>
                    :
                    <Product_details product={product}></Product_details>
            }

        </div>
    );
};

export default page;