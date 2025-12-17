'use client'
import Product_Details_loading from '@/components/loading_components/Product_Details_loading';
import Recently_viewed from '@/components/recently_viewed/Recently_viewed';
import { setInLocalStorage } from '@/components/recently_viewed/setInLocalStorage';
import Product_details from '@/components/shopPage_components/Product_details';
import { useGetSingleProductQuery } from '@/redux/features/All_Products/_allProduct_api';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const Product_details_page = () => {
    const { id, slug } = useParams()
    const { data: { data: product } = {}, isLoading, error, refetch } = useGetSingleProductQuery(id)

    useEffect(() => {
        if (!product?._id) return;

        setInLocalStorage(product._id);
    }, [product?._id]);

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
                    ? <Product_Details_loading />
                    : <Product_details product={product} refetch={refetch}></Product_details>
            }
            <Recently_viewed></Recently_viewed>

        </div>
    );
};

export default Product_details_page;