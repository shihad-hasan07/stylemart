'use client'
import Shop_page_loading from '@/components/loading_components/Shop_page_loading';
import Product_card from '@/components/shared/Product_card';
import Clear_filter from '@/components/Shop_page_Filter.jsx/Clear_filter';
import Main_Filter_for_sm from '@/components/Shop_page_Filter.jsx/Main_Filter_for_sm';
import Main_Filter_lg from '@/components/Shop_page_Filter.jsx/Main_Filter_lg';
import { useGetAllProductsQuery } from '@/redux/features/All_Products/_allProduct_api';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { IoIosArrowForward } from "react-icons/io";

const shop_page = () => {
    const { data, error, isLoading } = useGetAllProductsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });
    const products = data?.products || [];
    const filters = data?.filters || {};

    const allCategories = [...new Set(products.flatMap(res => res.categories))]
    const [selectedCategory, setSelectedCategory] = useState([]);

    // states for filter
    const [selected_filter_color, setSelected_filter_color] = useState([])
    const [selected_filter_size, setSelected_filter_size] = useState([])


    const handleSelectedCategory = (res) => {
        if (selectedCategory?.find(d => d == res)) {
            const newArray = selectedCategory.filter(data => data !== res)
            setSelectedCategory(newArray)
        }
        else {
            setSelectedCategory(prev => [...prev, res])
        }
    }

    const filteredByCategory = useMemo(() => {
        if (!selectedCategory || selectedCategory.length === 0) {
            return products;
        }
        return products.filter(product =>
            product.categories.some(cat => selectedCategory.includes(cat))
        );
    }, [products, selectedCategory]);


    const AllfilteredProducts = useMemo(() => {
        let result = filteredByCategory;

        // ================= COLOR FILTER =================
        if (selected_filter_color.length > 0) {
            result = result.filter(product => {
                const variation = product.variations?.find(v => v.attribute === "Color");
                if (!variation) return false;

                return variation.options.some(col =>
                    selected_filter_color.includes(col)
                );
            });
        }

        // ================= SIZE FILTER =================
        if (selected_filter_size.length > 0) {
            result = result.filter(product => {
                const variation = product.variations?.find(v => v.attribute === "Size");
                if (!variation) return false;

                return variation.options.some(sz =>
                    selected_filter_size.includes(sz)
                );
            });
        }
        return result;
    }, [filteredByCategory, selected_filter_color, selected_filter_size]);

    const [isOpen, setisOpen] = useState(false)


    const handleModal = () => {
        setTimeout(() => {
            setisOpen(!isOpen)
        }, 80)
    }

    return (
        <div className='container  mx-auto px-5 xl:px-20  mt-2'>
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

            {/* under the category -----> filter ++ sorting etc  */}
            <div className='flex justify-between items-center my-3'>

                {/* filter button in small device */}
                <button onClick={handleModal} className=' cursor-pointer flex xl:hidden items-center gap-1.5'><FiFilter /> <span>Filter</span> </button>

                {/* <p className='text-xs text-gray-600'>Showing 1-16 of 39 results</p> */}
                <p className='text-xs text-gray-600'>Showing {AllfilteredProducts?.length} results</p>

                <div className='font-medium text-[14px]'>
                    <div>
                        <label className="text-gray-600">Sort by :</label>
                        <select className="w-36 text-ellipsis cursor-pointer outline-0  border-0">
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
            <div className='mt-5 mb-10 flex '>

                {/* filter for less then xl device */}
                {isOpen && (<div className={`fixed inset-0 bg-black z-40 transition-all duration-150 opacity-30`} onClick={() => setisOpen(false)}></div>)}
                <Main_Filter_for_sm isOpen={isOpen} setisOpen={setisOpen} handleModal={handleModal}
                    props={{ filters, selected_filter_color, setSelected_filter_color, selected_filter_size, setSelected_filter_size }} />

                {/* aside filter for large screen */}
                <div className="pb-2 hidden xl:block sticky top-2 self-start h-fit">
                    <Main_Filter_lg props={{ filters, selected_filter_color, setSelected_filter_color, selected_filter_size, setSelected_filter_size }} />
                </div>

                <div className='hidden xl:block border opacity-10 border-gray-500' />

                <div className='w-full pb-5'>

                    {/* show the selected filter name */}
                    {(selected_filter_color.length > 0 || selected_filter_size.length > 0) &&
                        <Clear_filter props={{ selected_filter_color, setSelected_filter_color, selected_filter_size, setSelected_filter_size }} />
                    }

                    {/* products  */}
                    <div className='grid min-[500px]:grid-cols-2 min-[800px]:grid-cols-3 2xl:grid-cols-4 grow pl-0 xl:pl-6 gap-4'>
                        {
                            isLoading &&
                            [...Array(4)].map((_, idx) => <Shop_page_loading key={idx} />)
                        }
                        {
                            AllfilteredProducts?.map((product, idx) => <Product_card home={false} key={idx} product={product} shopPage={true}></Product_card>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default shop_page;