'use client'
import Shop_page_loading from '@/components/loading_components/Shop_page_loading';
import Product_card from '@/components/shared/Product_card';
import { useGetAllProductsQuery } from '@/redux/features/All_Products/_allProduct_api';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";

const shop_page = () => {
    const { data: products = [], error, isLoading } = useGetAllProductsQuery()
    const allCategories = [...new Set(products.flatMap(res => res.categories))]

    const [allProducts, setAllProducts] = useState([])

    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleSelectedCategory = (res) => {
        if (selectedCategory.find(d => d == res)) {
            const newArray = selectedCategory.filter(data => data !== res)
            setSelectedCategory(newArray)
        }
        else {
            setSelectedCategory(prev => [...prev, res])
        }
    }

    const filteredProducts = useMemo(() => {
        if (selectedCategory?.length === 0) {
            return products
        } else {
            const filteredDAta = products.filter(product => product.categories.some(cat => selectedCategory.includes(cat)))
            return filteredDAta
        }
    }, [products, selectedCategory])


    return (
        <div className='container mx-auto px-5 xl:px-20  mt-2'>
            {/* navigation */}
            <div className='flex items-center gap-1 text-[14px] max-w-3/4'>
                <Link href='/'><p>Home</p></Link>
                <IoIosArrowForward />
                <Link href='/shop' className='text-gray-400'><p>Shop</p></Link>
            </div>

            <p className='text-4xl font-semibold mt-4 mb-2.5'>Shop</p>
            <p className='text-xs opacity-90 tracking-wide'>Product Categories</p>

            {/* all categories name */}
            <div className='flex flex-wrap gap-1.5 mt-3'>
                {
                    allCategories.map((res, idx) => (
                        <label key={idx} className="flex text-[14px] font-[450] items-center gap-2 px-3 py-1 border border-[#b2c9e0] rounded-xs cursor-pointer">
                            <input
                                type="checkbox"
                                className='peer w-3 h-3 bg-[#f1f3f5] accent-[#ee403d]'
                                // checked={selectedCategory === res}
                                onChange={() => handleSelectedCategory(res)}
                            />
                            <span className='peer-checked:text-[#ee403d]'>{res}</span>
                        </label>
                    ))
                }
            </div>
            <div className='flex justify-between items-center my-3'>
                <p className='text-xs text-gray-600'>Showing 1-16 of 39 results</p>
                <div className='font-medium text-[14px]'>
                    <div>
                        <label className="text-gray-600">Sort by :</label>
                        <select className="w-36 text-ellipsis cursor-pointer">
                            <option value="">Select by popularity</option>
                            <option value="">Select by rating</option>
                            <option value="">Select by latest</option>
                            <option value="">Select by price: low to high</option>
                            <option value="">Select by price: high to low</option>
                        </select>
                    </div>
                </div>
            </div>
            <hr className="opacity-10" />
            <div className='my-4 flex'>
                <div className='hidden xl:flex w-[280px] h-full border-r border-gray-200 p-5'>Filter by color</div>

                <div className='grid min-[500px]:grid-cols-2 min-[800px]:grid-cols-3 2xl:grid-cols-4  grow pl-0 xl:pl-6 gap-4'>
                    {
                        isLoading &&
                        [...Array(4)].map((_, idx) => <Shop_page_loading key={idx} />)
                    }
                    {
                        filteredProducts?.map((product, idx) => <Product_card home={false} key={idx} product={product} shopPage={true}></Product_card>)
                    }
                </div>
            </div> 
        </div>
    );
};

export default shop_page;