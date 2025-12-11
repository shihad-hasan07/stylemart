"use client";

import Shop_page_loading from '@/components/loading_components/Shop_page_loading';
import FilterProductNotfound from '@/components/shared/FilterProductNotfound';
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

    const products = data?.data || [];

    // demo start
    const STANDARD_COLORS = [
        { name: "Black", hex: "#000000" },
        { name: "White", hex: "#e5e7eb" },
        { name: "Gray", hex: "#808080" },
        { name: "Navy Blue", hex: "#0b1d63" },
        { name: "Blue", hex: "#1e73ff" },
        { name: "Red", hex: "#ff2e2e" },
        { name: "Maroon", hex: "#7b1b1b" },
        { name: "Green", hex: "#1c7c3c" },
        { name: "Olive", hex: "#808000" },
        { name: "Beige", hex: "#f5e1b8" },
        { name: "Brown", hex: "#6b3b1f" },
        { name: "Pink", hex: "#f3a6b3" },
    ];

    const STANDARD_SIZES = [
        "XS", "S", "M", "L", "XL", "XXL",
        "24", "26", "28", "30", "32", "34"
    ];

    function generateFilters(products) {

        const colorCount = {};
        const sizeCount = {};

        // init 0
        STANDARD_COLORS.forEach(c => (colorCount[c.name] = 0));
        STANDARD_SIZES.forEach(s => (sizeCount[s] = 0));

        products.forEach(product => {

            // ==== COLOR ====
            const colorVar = product.variations?.find(v => v.attribute === "Color");
            if (colorVar) {
                [...new Set(colorVar.options)].forEach(col => {
                    if (colorCount[col] !== undefined) colorCount[col]++;
                });
            }

            // ==== SIZE ====
            const sizeVar = product.variations?.find(v => v.attribute === "Size");
            if (sizeVar) {
                [...new Set(sizeVar.options)].forEach(sz => {
                    if (sizeCount[sz] !== undefined) sizeCount[sz]++;
                });
            }
        });

        // Final Color Array (with HEX)
        const colors = STANDARD_COLORS
            .filter(c => colorCount[c.name] > 0)
            .map(c => ({
                color: c.name,
                hex: c.hex,
                total: colorCount[c.name]
            }));

        // Final Size Array
        const sizes = STANDARD_SIZES
            .filter(s => sizeCount[s] > 0)
            .map(size => ({
                size,
                total: sizeCount[size]
            }));

        return { colors, sizes };
    }
    //  demo end


    // const filters = data?.filters || {};
    const [filters, setFilters] = useState({});

    const allCategories = [...new Set(products.flatMap(res => res.categories))];

    // ==== CATEGORY FILTER STATE ====
    const [selectedCategory, setSelectedCategory] = useState([]);

    // ==== COLOR + SIZE STATE ====
    const [selected_filter_color, setSelected_filter_color] = useState([]);
    const [selected_filter_size, setSelected_filter_size] = useState([]);

    // Price filter state
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [priceRange, setPriceRange] = useState([0, 1000]);

    // in stock and onsale products
    const [instock_clicked, setInstock_clicked] = useState(false);
    const [onsale_clicked, setOnsale_clicked] = useState(false);


    // Calculate min and max prices from products
    useEffect(() => {
        if (products.length > 0) {
            const prices = products.map(p => p.price || 0);
            // const min = Math.min(...prices);
            const max = Math.max(...prices);

            // setMinPrice(min);
            setMaxPrice(max);
            setPriceRange([0, max]);
        }
    }, [products]);

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
    const color_size_filterd_products = useMemo(() => {
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


    // PRICE FILTER
    const price_filtered_products = useMemo(() => {
        return color_size_filterd_products.filter(product => {
            const price = product.price || 0;
            return price >= priceRange[0] && price <= priceRange[1];
        });
    }, [color_size_filterd_products, priceRange]);

    // INSTOCK & ONSALE FILTER (Final filtering step)
    const AllfilteredProducts = useMemo(() => {
        let result = price_filtered_products;

        // Filter by In Stock
        if (instock_clicked) {
            result = result.filter(product =>
                product.stock?.inStock === true
            );
        }

        // Filter by On Sale
        if (onsale_clicked) {
            result = result.filter(product =>
                product.sale?.active === true
            );
        }

        return result;
    }, [price_filtered_products, instock_clicked, onsale_clicked]);

    // dynamic filters generator for color and sizes
    useEffect(() => {
        const newFilters = generateFilters(AllfilteredProducts);

        setFilters(prev => {
            const isSame =
                JSON.stringify(prev) === JSON.stringify(newFilters);

            return isSame ? prev : newFilters;
        });
    }, [AllfilteredProducts]);

    const clearAllFilters = () => {
        setSelected_filter_color([]);
        setSelected_filter_size([]);
        setPriceRange([minPrice, maxPrice]);
        setInstock_clicked(false);
        setOnsale_clicked(false);
        setSelectedCategory([])
    }
    
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
                        // closeFilter,
                        filters,
                        selected_filter_color,
                        setSelected_filter_color,
                        selected_filter_size,
                        setSelected_filter_size,
                        minPrice,
                        setMinPrice,
                        maxPrice,
                        setMaxPrice,
                        priceRange,
                        setPriceRange,
                        instock_clicked, onsale_clicked,
                        setInstock_clicked, setOnsale_clicked
                    }}
                />

                {/* Large screen filter */}
                <div className="pb-2 hidden xl:block sticky top-0 self-start h-fit">
                    <Main_Filter_lg
                        props={{
                            filters,
                            selected_filter_color,
                            setSelected_filter_color,
                            selected_filter_size,
                            setSelected_filter_size,
                            minPrice,
                            setMinPrice,
                            maxPrice,
                            setMaxPrice,
                            priceRange,
                            setPriceRange,
                            instock_clicked, onsale_clicked,
                            setInstock_clicked, setOnsale_clicked
                        }}
                    />
                </div>

                <div className='hidden xl:block border opacity-10 border-gray-500' />

                <div className='w-full pb-5'>

                    {(
                        selected_filter_color.length > 0 || selected_filter_size.length > 0 ||
                        priceRange[0] !== 0 ||
                        priceRange[1] !== maxPrice ||
                        instock_clicked == true || onsale_clicked == true
                    ) &&
                        <Clear_filter
                            props={{
                                selected_filter_color,
                                setSelected_filter_color,
                                selected_filter_size,
                                setSelected_filter_size,
                                minPrice, maxPrice, priceRange, setPriceRange,
                                instock_clicked, onsale_clicked,
                                setInstock_clicked, setOnsale_clicked
                            }}
                        />
                    }

                    {AllfilteredProducts.length === 0 && !isLoading &&
                        <>
                            <FilterProductNotfound clearAllFilters={clearAllFilters} />
                        </>
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