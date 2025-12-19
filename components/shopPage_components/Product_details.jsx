'use client'

import { useState } from "react";
import Star_Rating from "../shared/_Rating/Star_Rating";

import SocialProfile from "../shared/SocialProfile";
import MainImage from "../ProductDetails_components/MainImage";
import AddTo_Cart from "../ProductDetails_components/AddTo_Cart";
import AddTo_Wishlist from "../ProductDetails_components/AddTo_Wishlist";
import Promises_And_additional_info from "../ProductDetails_components/Promises_And_additional_info";
import Select_by_variations from "../ProductDetails_components/Select_by_variations";
import Descrip_info_reviews from "../ProductDetails_components/Descrip_info_reviews";
import Related_Prducts from "../ProductDetails_components/Related_Prducts";

const Product_details = ({ product, refetch }) => {
    const { _id, sku, name, slug, brand, description, price, sale, images, categories, sortDescription, tags, rating, stock, variations, cartCount, wishlistCount, createdAt, updatedAt } = product;

    // for select size and color part
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const colorVariation = variations.find(v => v.attribute === 'Color' || v.attribute === 'color');
    const sizeVariation = variations.find(v => v.attribute === 'Size' || v.attribute === 'size');

    const availableColors = colorVariation?.options?.length > 0 ? colorVariation.options : [];
    const availableSizes = sizeVariation?.options?.length > 0 ? sizeVariation.options : [];


    return (
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-2 my-6">
            {/* text part */}
            <MainImage images={images} sale={sale} price={price}></MainImage>

            {/*  text part */}
            <div>
                {/* tittle */}
                <p className="text-3xl font-semibold tracking-wide">{name}</p>

                {/* rating */}
                <div className='flex gap-2 mt-2.5 mb-3 items-center'>
                    <Star_Rating rating={rating.average}></Star_Rating>
                    <span className='text-xs font-semibold'>{rating.count} reviews</span>
                </div>


                {/* brand */}
                {
                    brand &&
                    <div className='flex items-center gap-1.5 w-fit my-4  bg-green-50 text-green-700 px-3 py-1.5 rounded-md text-sm font-semibold border border-green-200 hover:bg-green-100 transition-colors duration-200'>
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span className=''>
                            {brand}
                        </span>
                    </div>
                }

                <hr className="opacity-15" />

                {/* price */}
                <div className='text-left mt-4'>
                    {
                        sale?.active
                            ? <div className='flex items-end gap-2 '>
                                <p className='line-through pb-0.5 text-[13px] lg:text-[20px] text-[#768088]'>
                                    {price}৳
                                </p>
                                <p className='text-[15px] lg:text-[26px] font-semibold text-[#E53E3E]'>{sale?.price}৳</p>
                            </div>
                            : <div className='text-[15px] lg:text-[26px] font-semibold'>{price}৳</div>
                    }
                </div>
                <p className=" text-gray-600">{sortDescription}</p>

                <Select_by_variations Allinfo={{ selectedColor, selectedSize, setSelectedColor, setSelectedSize, availableColors, availableSizes }} />

                <p className="bg-[#ebe0dff1] mt-6 w-fit font-medium px-3 rounded-xs py-1 text-red-600 text-sm tracking-wide">{stock?.inStock ? 'In Stock' : 'Out of stock'}</p>

                {/* cart - wishlist */}
                <AddTo_Cart info={{ selectedColor, selectedSize, _id, name, slug, price, sale, images, stock, colors: availableColors, sizes: availableSizes }} />
                <AddTo_Wishlist wishlistCount={wishlistCount} info={{ _id, slug, name, price, sale, image: images[0], stock }} />

                <hr className="opacity-15 my-6" />

                <Promises_And_additional_info sku={sku} categories={categories} tags={tags} />
                <SocialProfile></SocialProfile>
            </div>

            {/* Decription - AdditionalInfo - Review */}
            <div className="md:col-span-2 mt-7 md:mt-5">
                <Descrip_info_reviews Info={{ _id, slug, name, description, variations, rating, colorVariation, refetch }} />
            </div>

            {/* Show  max 4 related to the products */}
            <div className="md:col-span-2 mt-10">
                <Related_Prducts info={{ _id, categories, tags }} />
            </div>
        </div >
    );
};

export default Product_details;