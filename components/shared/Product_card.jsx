
import React from 'react';
import Star_Rating from './_Rating/Star_Rating';
import Image from 'next/image';
import { IoIosHeartEmpty } from "react-icons/io";
import Link from 'next/link';

const Product_card = ({ product, shopPage }) => {
    const { _id, name, images, rating, price, sale, stock, slug } = product;
    return (
        <div className='pb-10 group overflow-hidden'>
            {/* image */}
            <Link href={`/shop/${_id}/${slug}`}>
                <div className={`relative ${shopPage ? 'h-[400px] sm:h-[360px] lg:h-[370px]' : 'h-[400px] sm:h-[360px] lg:h-[400px]'}  bg-[#faf7fa]`}>
                    <Image placeholder="blur" loading="lazy" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg=="
                        src={images[0]} fill alt={name}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 25vw, 25vw"
                        className='rounded-xs '
                    >
                    </Image>

                    {/* absolute things in the top right of the iamges */}
                    {/* wishlist */}
                    <div className='absolute -right-12 top-3 flex items-center justify-center bg-white w-[30px] h-[30px] rounded-full shadow-lg transition-all duration-300 group-hover:right-3'>
                        <IoIosHeartEmpty size={22} />
                    </div>

                    {/* show discount */}
                    {
                        sale?.active ?
                            <div className='absolute left-2.5 top-2.5 bg-[#e53e3e] text-sm px-1.5 rounded-xs text-white'>
                                {((price - sale.price) / price * 100).toFixed(0)}%
                            </div>
                            : ''
                    }
                </div>
            </Link>
            <div className='flex gap-2 mt-3 items-center'>
                <Star_Rating rating={rating.average}></Star_Rating>
                <span className='text-xs font-semibold'>({rating.count})</span>
            </div>
            <Link href={`/shop/${slug}`}><h2 className='my-2 hover:underline text-left font-[450] text-[15px]'>{name}</h2></Link>
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
            {
                shopPage && <p className='text-xs font-medium text-[#40C057]'>
                    {
                        stock?.inStock ? 'In Stock' : 'Out of Stock'
                    }
                </p>
            }
        </div>
    );
};

export default Product_card;