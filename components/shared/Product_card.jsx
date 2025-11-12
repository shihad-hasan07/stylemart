
import React from 'react';
import Star_Rating from './_Rating/Star_Rating';
import Image from 'next/image';
import { IoIosHeartEmpty } from "react-icons/io";

const Product_card = ({ product }) => {
    const { name, images, rating, price, sale } = product
    return (
        <div className='pb-10 group overflow-hidden'>
            {/* image */}
            <div className='relative h-[400px] sm:h-[360px] lg:h-[400px]'>
                <Image placeholder="blur" loading="lazy" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg=="
                    src={images[0]} fill alt={name}
                    className='rounded-xs '
                >
                </Image>

                {/* absolute things in the top right of the iamges */}
                {/* wishlist */}
                <div className='absolute -right-12 top-3 flex items-center justify-center bg-white w-[30px] h-[30px] rounded-full shadow-lg transition-all duration-300 group-hover:right-3'>
                    <IoIosHeartEmpty size={22} />
                </div>
            </div>
            <div className='flex gap-2 mt-3 items-center'>
                <Star_Rating rating={rating.average}></Star_Rating>
                <span className='text-xs font-semibold'>({rating.count})</span>
            </div>
            <h2 className='my-2 text-left font-[450] text-[15px]'>{name}</h2>
            <div className='text-left'>
                {
                    sale?.active
                        ? <div className='flex items-end gap-2 font-semibold'>
                            <p className='line-through text-[13px] text-[#768088]'>
                                {price}৳
                            </p>
                            <p className='text-[15px] text-[#E53E3E]'>{sale?.price}৳</p>
                        </div>
                        : <div className='text-[15px] font-semibold'>{price}৳</div>
                }
            </div>

        </div>
    );
};

export default Product_card;