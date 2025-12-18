'use client'
import { addToWishlist } from '@/redux/features/addToWishlist/slice_addtoWishlist';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { FiHeart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

const AddTo_Wishlist = ({ wishlistCount, info }) => {
    const { _id, slug, name, price, sale, image, stock } = info
    
    const dispatch = useDispatch()
    const router = useRouter();
    const searchParams = useSearchParams();

    const { wishlistProducts } = useSelector(state => state.wishlist)

    const handle_addtoWishlist = () => {
        dispatch(addToWishlist({
            _id: _id,
            slug: slug,
            name: name,
            image: image,
            originalPrice: price,
            salePrice: sale?.active ? sale.price : null,
            inStock: stock.inStock
        }));

        const params = new URLSearchParams(searchParams.toString());
        params.set("wishlist", "true");
        params.set("product", name);
        router.replace(`?${params.toString()}`, { scroll: false });
    }
    return (
        <div className="flex items-center mt-5 font-medium gap-1.5">
            {
                wishlistProducts?.find(data => data._id == _id) ?
                    <Link href='/wishlist'><p className="cursor-pointer flex items-center gap-1.5"><FiHeart fill='black' /><span>View wishlist</span></p></Link>
                    :
                    <p onClick={handle_addtoWishlist} className="cursor-pointer flex items-center gap-1.5"><FiHeart /><span>Add to wishlist</span></p>
            }

            {
                wishlistCount ? <p className="font-light text-gray-500"> <span className="font-semibold pl-2">{wishlistCount} people</span> favorited this product </p> : ''
            }

        </div>
    );
};

export default AddTo_Wishlist;