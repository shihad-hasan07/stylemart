'use client'
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

const update_Products = () => {
    const { id } = useParams()
    const router = useRouter()
    if (!id) return router.push('/admin/products')
    return (
        <div>
{
    id
}
        </div>
    );
};

export default update_Products;