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
 
const Product_details = ({ product }) => {
    const { _id, sku, name, slug, brand, description, price, sale, images, categories, sortDescription, tags, rating, stock, variations, cartCount, wishlistCount, createdAt, updatedAt } = product;

    // for select size and color part
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    const colorVariation = variations.find(v => v.attribute === 'Color' || v.attribute === 'color');
    const sizeVariation = variations.find(v => v.attribute === 'Size' || v.attribute === 'size');

    const availableColors = colorVariation?.options?.length > 0 ? colorVariation.options : [];
    const availableSizes = sizeVariation?.options?.length > 0 ? sizeVariation.options : [];


    return (
        <div className="grid md:grid-cols-2 gap-10 my-6">
            <MainImage images={images} sale={sale} price={price}></MainImage>

            {/*  text part */}
            <div>
                <p className="text-3xl font-semibold tracking-wide">{name}</p>
                <div className='flex gap-2 mt-2.5 mb-3 items-center'>
                    <Star_Rating rating={rating.average}></Star_Rating>
                    <span className='text-xs font-semibold'>{rating.count} reviews</span>
                </div>
                <hr className="opacity-15" />
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
                <AddTo_Cart selectedColor={selectedColor} selectedSize={selectedSize} />
                <AddTo_Wishlist wishlistCount={wishlistCount} />

                <hr className="opacity-15 my-6" />

                <Promises_And_additional_info sku={sku} categories={categories} tags={tags} />
                <SocialProfile></SocialProfile>
            </div>

            {/* Decription - AdditionalInfo - Review */}
            <div className="md:col-span-2">
                <Descrip_info_reviews Info={{ _id, description, variations, colorVariation }} />
            </div>

            {/* Show  max 4 related to the products */}
            <div className="md:col-span-2">
                <Related_Prducts info={{ _id, categories, tags }} />
            </div>
        </div >
    );
};

export default Product_details;