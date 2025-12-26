'use client'
import Products_page_loading from '@/app/dashboard/components/Loader/Products_page_loading';
import { useGetSingleProductQuery } from '@/redux/features/All_Products/_allProduct_api';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

const update_Products = () => {
    const { id } = useParams()
    const router = useRouter()
    const { data: { data: product } = {}, isLoading, error, refetch } = useGetSingleProductQuery(id)


    if (isLoading) return <Products_page_loading/>
        return (
            <div>
                {product?.name}
            </div>
        );
};

export default update_Products;