import React from 'react';
import { FiHeart } from 'react-icons/fi';

const AddTo_Wishlist = ({ wishlistCount }) => {
    const handle_addtoWishlist = () => [

    ]
    return (
        <div className="flex items-center mt-5 font-medium gap-1.5">
            <p onClick={handle_addtoWishlist} className="cursor-pointer flex items-center gap-1.5"><FiHeart /><span>Add to wishlist</span></p>
            {
                wishlistCount ? <p className="font-light text-gray-500"> <span className="font-semibold pl-2">{wishlistCount} people</span> favorited this product </p> : ''
            }

        </div>
    );
};

export default AddTo_Wishlist;