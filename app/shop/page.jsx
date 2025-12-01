"use client";

import Shop_page_loading from '@/components/loading_components/Shop_page_loading';
import Product_card from '@/components/shared/Product_card';
import Clear_filter from '@/components/Shop_page_Filter.jsx/Clear_filter';
import Main_Filter_for_sm from '@/components/Shop_page_Filter.jsx/Main_Filter_for_sm';
import Main_Filter_lg from '@/components/Shop_page_Filter.jsx/Main_Filter_lg';
import { useGetAllProductsQuery } from '@/redux/features/All_Products/_allProduct_api';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { IoIosArrowForward } from "react-icons/io";

const shop_page = () => {
    const params = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const categoryParam = params.get('category');

    // URL-driven filter state
    const isFilterOpen = params.get("isFilterOpen") === "true";

    const openFilter = () => {
        const newParams = new URLSearchParams(params.toString());
        newParams.set("isFilterOpen", "true");
        router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    };

    const closeFilter = () => {
        const newParams = new URLSearchParams(params.toString());
        newParams.delete("isFilterOpen");

        const q = newParams.toString();
        router.replace(`${pathname}${q ? `?${q}` : ""}`, { scroll: false });
    };

    // ============ FETCH DATA ==================
    const { data, error, isLoading } = useGetAllProductsQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });

    const products = data?.products || [];
    const filters = data?.filters || {};
    const allCategories = [...new Set(products.flatMap(res => res.categories))];

    // ==== CATEGORY FILTER STATE ====
    const [selectedCategory, setSelectedCategory] = useState([]);

    // ==== COLOR + SIZE STATE ====
    const [selected_filter_color, setSelected_filter_color] = useState([]);
    const [selected_filter_size, setSelected_filter_size] = useState([]);

    // read query param category → set selected category
    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory([`${categoryParam}`]);
            setSelected_filter_color([]);
            setSelected_filter_size([]);
        }
    }, [categoryParam]);

    useEffect(() => {
        if (!categoryParam) return;
        if (selectedCategory.length > 1)
            return router.replace('/shop', { scroll: false });
    }, [selectedCategory]);

    // CATEGORY SELECT HANDLER
    const handleSelectedCategory = (res) => {
        if (selectedCategory.includes(res)) {
            setSelectedCategory(selectedCategory.filter(item => item !== res));
        } else {
            setSelectedCategory([...selectedCategory, res]);
        }
    };

    // CATEGORY FILTER
    const filteredByCategory = useMemo(() => {
        if (selectedCategory.length === 0) return products;

        return products.filter(product =>
            product.categories.some(cat => selectedCategory.includes(cat))
        );
    }, [products, selectedCategory]);

    // COLOR + SIZE FILTER
    const AllfilteredProducts = useMemo(() => {
        let result = filteredByCategory;

        // COLOR
        if (selected_filter_color.length > 0) {
            result = result.filter(product => {
                const variation = product.variations?.find(v => v.attribute === "Color");
                if (!variation) return false;

                return variation.options.some(col =>
                    selected_filter_color.includes(col)
                );
            });
        }

        // SIZE
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

    return (
        <div className='container mx-auto px-5 xl:px-20 mt-2'>
            {/* navigation */}
            <div className='flex items-center gap-1 text-[14px]'>
                <Link href='/'><p>Home</p></Link>
                <IoIosArrowForward />
                <Link href='/shop' className='text-gray-400'><p>Shop</p></Link>
            </div>

            <p className='text-4xl font-semibold mt-4 mb-2.5'>Shop</p>
            <p className='text-xs opacity-90 tracking-wide'>Product Categories</p>

            {/* category filters */}
            <div className='flex flex-wrap gap-1.5 mt-3'>
                {allCategories.map((category, idx) => (
                    <label key={idx} className="flex text-[14px] font-[450] items-center gap-2 px-3 py-1 border border-[#b2c9e0] rounded-xs cursor-pointer">
                        <input
                            type="checkbox"
                            className='peer w-3 h-3 bg-[#f1f3f5] accent-[#ee403d]'
                            checked={selectedCategory.includes(category)}
                            onChange={() => handleSelectedCategory(category)}
                        />
                        <span className='peer-checked:text-[#ee403d]'>{category}</span>
                    </label>
                ))}
            </div>

            {/* filter + sorting header */}
            <div className='flex justify-between items-center my-3'>
                {/* filter button on mobile */}
                <button
                    onClick={openFilter}
                    className='cursor-pointer flex xl:hidden items-center gap-1.5'
                >
                    <FiFilter /> <span>Filter</span>
                </button>

                <p className='text-xs text-gray-600'>Showing {AllfilteredProducts.length} results</p>

                <div className='font-medium text-[14px]'>
                    <label className="text-gray-600">Sort by :</label>
                    <select className="w-36 cursor-pointer outline-0 border-0">
                        <option value="">Select by popularity</option>
                        <option value="">Select by rating</option>
                        <option value="">Select by latest</option>
                        <option value="">Price: low to high</option>
                        <option value="">Price: high to low</option>
                    </select>
                </div>
            </div>

            <hr className="opacity-10" />

            <div className='mt-5 mb-10 flex'>

                {/* Overlay */}
                {isFilterOpen && (
                    <div
                        onClick={closeFilter}
                        className="fixed inset-0 bg-black opacity-30 z-40"
                    />
                )}

                {/* Mobile filter drawer */}
                <Main_Filter_for_sm
                    isOpen={isFilterOpen}
                    handleModal={() => (
                        isFilterOpen ? closeFilter() : openFilter()
                    )}
                    props={{
                        closeFilter,
                        filters,
                        selected_filter_color,
                        setSelected_filter_color,
                        selected_filter_size,
                        setSelected_filter_size
                    }}
                />

                {/* Large screen filter */}
                <div className="pb-2 hidden xl:block sticky top-2 self-start h-fit">
                    <Main_Filter_lg
                        props={{
                            filters,
                            selected_filter_color,
                            setSelected_filter_color,
                            selected_filter_size,
                            setSelected_filter_size
                        }}
                    />
                </div>

                <div className='hidden xl:block border opacity-10 border-gray-500' />

                <div className='w-full pb-5'>

                    {(selected_filter_color.length > 0 || selected_filter_size.length > 0) &&
                        <Clear_filter
                            props={{
                                selected_filter_color,
                                setSelected_filter_color,
                                selected_filter_size,
                                setSelected_filter_size
                            }}
                        />
                    }

                    {AllfilteredProducts.length === 0 &&
                        <p className='text-center text-gray-500 mt-10'>
                            No products found matching the selected filters.
                        </p>
                    }

                    <div className='grid min-[500px]:grid-cols-2 min-[800px]:grid-cols-3 2xl:grid-cols-4 gap-4 pl-0 xl:pl-6'>
                        {isLoading &&
                            [...Array(4)].map((_, idx) => <Shop_page_loading key={idx} />)
                        }

                        {AllfilteredProducts.map((product, idx) =>
                            <Product_card
                                home={false}
                                key={idx}
                                product={product}
                                shopPage={true}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default shop_page;
