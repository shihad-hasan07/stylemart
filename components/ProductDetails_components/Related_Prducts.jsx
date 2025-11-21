import { useGetAllProductsQuery } from '@/redux/features/All_Products/_allProduct_api';
import React from 'react';
import Product_card from '../shared/Product_card';
import Related_Products_loading from '../loading_components/Related_Products_loading';

const Related_Prducts = ({ info }) => {
    const { _id, categories, tags } = info
    const { data: products = [], isLoading, error } = useGetAllProductsQuery()

    const relatedProducts = products
        ?.filter(p =>
            p._id !== _id &&
            (
                p.categories.some(c => categories.includes(c)) ||
                p.tags.some(t => tags.includes(t))
            )
        )
        .sort((a, b) => b.rating.average - a.rating.average).slice(0, 4);

    return (
        <div>
            {
                isLoading &&
                <Related_Products_loading />
            }
            {
                relatedProducts?.length > 0 && <h2 className='text-[20px] font-medium mb-4'>Related Products...</h2>
            }
            <div className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8'>
                {
                    relatedProducts?.map((p, idx) => <Product_card key={idx} product={p}></Product_card>)
                }
            </div>
        </div>
    );
};

export default Related_Prducts;