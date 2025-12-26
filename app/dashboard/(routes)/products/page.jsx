'use client'
import { useGetAllProductsQuery } from '@/redux/features/All_Products/_allProduct_api';
import Routes_heading_texts from '../../components/shared/Routes_heading_texts';
import { FiFilter } from 'react-icons/fi';
import { RxDownload } from 'react-icons/rx';
import { HiOutlinePlusSm } from "react-icons/hi";
import { Edit2, MoreVertical, Trash2 } from 'lucide-react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { allContext } from '@/Auth/Authprovider';
import Products_page_loading from '../../components/Loader/Products_page_loading';
import Swal from 'sweetalert2';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Main_Filter_for_sm from '@/components/Shop_page_Filter.jsx/Main_Filter_for_sm';
import FilterProductNotfound from '@/components/shared/FilterProductNotfound';
import Clear_filter from '@/components/Shop_page_Filter.jsx/Clear_filter';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Products_page = () => {
    const { data, error, refetch, isLoading } = useGetAllProductsQuery(undefined, { pollingInterval: 30000, refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true, });
    // const { data, error, refetch, isLoading } = useGetAllProductsQuery();
    const { user, logOut, loading, userfromDB } = useContext(allContext);
    const [openMenuId, setOpenMenuId] = useState(null);
    const axiosSecure = useAxiosSecure()
    const router = useRouter()
    const role = userfromDB?.role
    const permissions = {
        admin: {
            canAdd: true,
            canEdit: true,
            canDelete: true
        },
        manager: {
            canAdd: true,
            canEdit: true,
            canDelete: false
        },
        staff: {
            canAdd: false,
            canEdit: false,
            canDelete: false
        },
    };
    const capable = permissions[role] || {}
    const products = data?.data?.products || [];
    const getStatusColor = (status) => {
        switch (status) {
            case "In Stock":
                return "bg-green-100 text-green-700";
            case "Low Stock":
                return "bg-yellow-100 text-yellow-700";
            case "Out of Stock":
                return "bg-red-200 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };
    const handleEdit = (id) => {
        if (id) {
            router.push(`/dashboard/products/update/${id}`)
        }
    }
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Delete Product?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            preConfirm: async () => {
                try {
                    console.log(id);
                    await axiosSecure.delete(`products/delete/${id}`)
                } catch (error) {
                    Swal.fire({
                        title: 'Failed',
                        icon: 'error',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    Swal.showValidationMessage(
                        'Failed to delete the product'
                    )
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Products successfully deleted.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
                refetch()
            }
        })
    }

    // below things are for the filter in this page -----start( Reuse form shop page)
    // const allCategories = [...new Set(products.flatMap(res => res.categories))];
    const allCategories = Object.entries(
        products.flatMap(p => p.categories)
            .reduce((a, c) => ((a[c] = (a[c] || 0) + 1), a), {})
    )
        .sort((a, b) => b[1] - a[1])
        .map(([c]) => c);

    const [isFilterOpen, setIsFIlterOpen] = useState(false)
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
    const [filters, setFilters] = useState({});
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selected_filter_color, setSelected_filter_color] = useState([]);
    const [selected_filter_size, setSelected_filter_size] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [priceRange, setPriceRange] = useState([0, 1000]);
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
        setFilters(prev =>
            JSON.stringify(prev) === JSON.stringify(newFilters)
                ? prev
                : newFilters
        );
    }, [AllfilteredProducts]);

    const clearAllFilters = () => {
        setSelected_filter_color([]);
        setSelected_filter_size([]);
        setPriceRange([minPrice, maxPrice]);
        setInstock_clicked(false);
        setOnsale_clicked(false);
        setSelectedCategory([])
    }

    //  filter end


    if (isLoading) return <Products_page_loading />
    return (
        <div>
            {/* filter open or close */}
            <>
                {isFilterOpen && (
                    <div
                        onClick={() => setIsFIlterOpen(false)}
                        className="fixed inset-0 bg-black opacity-30 z-40"
                    />
                )}
                <Main_Filter_for_sm
                    dashboard={true}
                    isOpen={isFilterOpen}
                    handleModal={() => setIsFIlterOpen(false)}
                    props={{
                        filters, selected_filter_color, setSelected_filter_color,
                        selected_filter_size, setSelected_filter_size, minPrice, setMinPrice,
                        maxPrice, setMaxPrice, priceRange, setPriceRange, instock_clicked,
                        onsale_clicked, setInstock_clicked, setOnsale_clicked
                    }}
                />
            </>

            {/* heading */}
            <Routes_heading_texts name={'products'} total={AllfilteredProducts?.length} />
            <div className='px-6 m-5 bg-white rounded-xl py-5'>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-2.5'>
                        <button onClick={() => setIsFIlterOpen(true)} className='cursor-pointer flex items-center gap-1.5 text-sm sm:text-base border border-gray-300 rounded-md px-4 sm:px-5.5 py-2'><FiFilter /><span>Filter</span></button>
                        <button className='cursor-pointer flex items-center gap-1.5 text-sm sm:text-base border border-gray-300 rounded-md px-3 sm:px-4 py-2'><RxDownload /><span>Export</span></button>
                    </div>
                    {/*  add products button */}
                    {
                        role == 'staff' ? <button className='border border-gray-400 rounded-md px-3 text-sm sm:text-base sm:px-5.5 py-2 font-semibold bg-red-500 hover:opacity-90 text-white'>
                            Inventory</button>
                            : <Link href={'/dashboard/products/add'}> <button className='cursor-pointer flex items-center gap-1.5 border border-gray-400 rounded-md px-3 text-sm sm:text-base sm:px-5.5 py-2 font-semibold bg-red-500 hover:opacity-90 text-white'><HiOutlinePlusSm size={22} />
                                <span>Add product</span></button>
                            </Link>
                    }
                </div>
            </div>

            {/*  show all teh categories */}
            <div className='px-6 m-5 bg-white rounded-xl py-5 mt-3'>
                <p className="text-md font-semibold text-gray-700">Available Categories</p>
                {/* <p className="text-sm font-semibold text-gray-700">Filter by Category</p> */}
                <p className="text-xs text-gray-600 ">Select categories to filter products.</p>

                <div className='flex flex-wrap gap-1.5 mt-4'>
                    {allCategories.map((category, idx) => (
                        <label key={idx} className="flex text-[14px] font-[450] items-center gap-2 px-3 py-1 border border-[#b2c9e0] rounded-xs cursor-pointer">
                            <input
                                type="checkbox"
                                className='cursor-pointer peer w-3 h-3 bg-[#f1f3f5] accent-[#ee403d]'
                                checked={selectedCategory.includes(category)}
                                onChange={() => handleSelectedCategory(category)}
                            />
                            <span className='peer-checked:text-[#ee403d]'>{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* clear all the filters */}
            <div className={`px-7 xl:px-1 ${(selected_filter_color.length > 0 || selected_filter_size.length > 0 || priceRange[0] !== 0 || priceRange[1] !== maxPrice || instock_clicked == true || onsale_clicked == true) && '-mt-2 -mb-1.5'}`}>
                {(selected_filter_color.length > 0 || selected_filter_size.length > 0 || priceRange[0] !== 0 || priceRange[1] !== maxPrice || instock_clicked == true || onsale_clicked == true)
                    && <Clear_filter
                        categoryFilter={allCategories}
                        props={{ selected_filter_color, setSelected_filter_color, selected_filter_size, setSelected_filter_size, minPrice, maxPrice, priceRange, setPriceRange, instock_clicked, onsale_clicked, setInstock_clicked, setOnsale_clicked }} />
                }
            </div>

            <div className=" bg-white rounded-xl mx-5 my-5 overflow-hidden">

                {/* No products of matching selection */}
                {AllfilteredProducts.length === 0 && !isLoading &&
                    <FilterProductNotfound clearAllFilters={clearAllFilters} />
                }
                {
                    AllfilteredProducts.length === 0 && !isLoading ||
                    <div className={`hidden ${(capable?.canDelete || capable?.canEdit) ? ' md:grid md:grid-cols-[0.1fr_2fr_1.2fr_1fr_0.8fr_1fr] lg:grid-cols-[0.1fr_1.7fr_0.8fr_0.9fr_0.9fr_0.8fr_0.6fr] '
                        : ' md:grid md:grid-cols-[0.1fr_2fr_1.2fr_1fr_0.8fr] lg:grid-cols-[0.1fr_1.7fr_0.8fr_0.9fr_0.9fr_0.8fr] '}  gap-4 px-6 py-4 border-b border-gray-200`}>
                        <div className="text-sm font-medium text-gray-600">#</div>
                        <div className="text-sm font-medium text-gray-600 ">PRODUCT</div>
                        <div className="text-sm font-medium text-gray-600  flex justify-center">CATEGORY</div>
                        <div className="text-sm font-medium text-gray-600 flex justify-center">PRICE</div>
                        <div className="text-sm font-medium text-gray-600 flex justify-center">STOCK</div>
                        <div className="text-sm font-medium text-gray-600 hidden lg:flex justify-center">STATUS</div>
                        {
                            (capable?.canDelete || capable?.canEdit) &&
                            <div className="text-sm font-medium text-gray-600 flex justify-center">ACTIONS</div>
                        }
                    </div>
                }

                {/* Products List */}
                <div className="divide-y divide-gray-200">
                    {AllfilteredProducts?.map((product, idx) => (
                        <div key={product._id}
                            className={`${(capable?.canDelete || capable?.canEdit) ? 'md:grid md:grid-cols-[0.1fr_2fr_1.2fr_1fr_0.8fr_1fr] lg:grid-cols-[0.1fr_1.7fr_0.8fr_0.9fr_0.9fr_0.8fr_0.6fr]'
                                : 'md:grid md:grid-cols-[0.1fr_2fr_1.2fr_1fr_0.8fr] lg:grid-cols-[0.1fr_1.7fr_0.8fr_0.9fr_0.9fr_0.8fr]'}   gap-4 px-4 md:px-6 py-4 hover:bg-gray-50 transition-colors`}
                        >
                            {/* for small device */}
                            <div className="md:hidden">
                                {/* Compact Product Card */}
                                <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-gray-200">
                                    {/* Product Image */}
                                    <div className="relative w-20 h-20">
                                        <Image src={product?.images[0]} fill alt={product?.name} className='rounded-lg object-cover shrink-0 border border-gray-200' />
                                        {/* Sale Percentage Badge */}
                                        {product?.sale?.active && (
                                            <span className="absolute -top-1.5 -left-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                                                {Math.round(((product.price - product.sale.price) / product.price) * 100)}%
                                            </span>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0">
                                        {/* Title */}
                                        <h3 className="font-medium text-gray-900 text-sm mb-1.5 line-clamp-2 leading-snug">
                                            {product?.name}
                                        </h3>

                                        {/* Categories */}
                                        <div className="flex gap-1.5 mb-2 flex-wrap">
                                            {product?.categories.map(e => (
                                                <span key={e} className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
                                                    {e}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Price and Stock */}
                                        <div className="flex items-center gap-2.5 text-sm">
                                            {/* Price with Sale */}
                                            <div className="flex items-center gap-1.5">
                                                {product?.sale?.active ? (
                                                    <>
                                                        <span className="font-semibold text-red-600">
                                                            ৳{product?.sale?.price.toLocaleString()}
                                                        </span>
                                                        <span className="text-xs text-gray-400 line-through">
                                                            ৳{product?.price.toLocaleString()}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="font-semibold text-gray-900">
                                                        ৳{product?.price.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>

                                            <span className="text-gray-300">|</span>
                                            <span>
                                                <span className='text-xs font-semibold'>{product?.stock.inStock ? `${product.stock.quantity}` : '0'}</span>
                                                <span className='text-gray-600 text-xs'> units</span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* 3 Dot Menu - Top Aligned */}
                                    <div className="relative">
                                        {
                                            (capable?.canDelete || capable?.canEdit) ?
                                                <>
                                                    <button onClick={() => setOpenMenuId(openMenuId === product._id ? null : product._id)}
                                                        className="cursor-pointer p-1.5 hover:bg-gray-100 rounded-lg transition-colors" aria-label="More options"
                                                    >
                                                        <MoreVertical size={18} className="text-gray-600" />
                                                    </button>
                                                    {openMenuId === product._id && (
                                                        <>
                                                            <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)}></div>

                                                            <div className="absolute right-3 top-7 z-20 bg-white rounded-sm shadow-lg border border-gray-200  min-w-[140px]">
                                                                {
                                                                    capable?.canEdit &&
                                                                    <button
                                                                        className="cursor-pointer w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 text-left text-sm text-gray-700 transition-colors"
                                                                        onClick={() => { setOpenMenuId(null); handleEdit(product?._id) }}
                                                                    >
                                                                        <Edit2 size={16} className="text-blue-600" />
                                                                        <span>Edit</span>
                                                                    </button>
                                                                }
                                                                {
                                                                    capable?.canDelete &&
                                                                    <button
                                                                        className="cursor-pointer w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 text-left text-sm text-red-600 transition-colors"
                                                                        onClick={() => { setOpenMenuId(null); handleDelete(product?._id) }}
                                                                    >
                                                                        <Trash2 size={16} />
                                                                        <span>Delete</span>
                                                                    </button>
                                                                }
                                                            </div>
                                                        </>
                                                    )}
                                                </>
                                                : <span className={`px-3 py-1.5 rounded-md text-xs font-medium ${product?.stock.quantity == 0
                                                    ? getStatusColor('Out of Stock')
                                                    : product?.stock.quantity < 10
                                                        ? getStatusColor('Low Stock')
                                                        : getStatusColor('In Stock')
                                                    }`}>
                                                    {product?.stock.quantity == 0
                                                        ? 'Out of Stock'
                                                        : product?.stock.quantity < 10
                                                            ? 'Low Stock'
                                                            : 'In Stock'}
                                                </span>
                                        }
                                    </div>
                                </div>
                            </div>


                            {/* for lg device */}
                            <div className='hidden md:flex items-center'>
                                {idx + 1}
                            </div>

                            <div className="hidden md:flex items-center gap-3">
                                <div className="relative shrink-0 w-16 h-16">
                                    {/* <img
                                        src={product?.images[0]}
                                        alt={product?.name}
                                        className="w-16 h-16 rounded-lg object-cover border border-gray-200 shadow-sm"
                                    /> */}
                                    <Image src={product?.images[0]} fill alt={product?.name} className='rounded-lg object-cover border border-gray-200 ' />

                                    {/* Sale Badge */}
                                    {product?.sale?.active && (
                                        <span className="absolute -top-1 -left-1 bg-red-500 text-white text-[9px] font-bold px-1 py-0.5 rounded shadow-sm">
                                            {Math.round(((product.price - product.sale.price) / product.price) * 100)}%
                                        </span>
                                    )}
                                </div>
                                <span className="font-medium text-gray-900 line-clamp-2 text-sm leading-snug">
                                    {product?.name}
                                </span>
                            </div>

                            <div className="hidden md:flex md:items-center md:justify-center gap-1.5 flex-wrap">
                                {product?.categories.map(e => (
                                    <span
                                        key={e}
                                        className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded border border-gray-200"
                                    >
                                        {e}
                                    </span>
                                ))}
                            </div>

                            <div className="hidden md:flex items-center justify-center">
                                {product?.sale?.active ? (
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-red-600 text-sm">
                                            ৳{product?.sale?.price.toLocaleString()}
                                        </span>
                                        <span className="text-xs text-gray-400 line-through">
                                            ৳{product?.price.toLocaleString()}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="font-semibold text-gray-900 text-sm">
                                        ৳{product?.price.toLocaleString()}
                                    </span>
                                )}
                            </div>

                            <div className="hidden md:flex items-center justify-center">
                                <div className="flex items-center gap-1">
                                    <span className={`font-semibold text-sm ${product?.stock.quantity === 0
                                        ? 'text-red-600'
                                        : product?.stock.quantity < 10
                                            ? 'text-amber-600'
                                            : 'text-gray-900'
                                        }`}>
                                        {product?.stock.inStock ? product.stock.quantity : '0'}
                                    </span>
                                    <span className="text-gray-500 text-xs">units</span>
                                </div>
                            </div>

                            <div className="hidden lg:flex items-center justify-center">
                                <span className={`px-3 py-1.5 rounded-md text-xs font-medium ${product?.stock.quantity == 0
                                    ? getStatusColor('Out of Stock')
                                    : product?.stock.quantity < 10
                                        ? getStatusColor('Low Stock')
                                        : getStatusColor('In Stock')
                                    }`}>
                                    {product?.stock.quantity == 0
                                        ? 'Out of Stock'
                                        : product?.stock.quantity < 10
                                            ? 'Low Stock'
                                            : 'In Stock'}
                                </span>
                            </div>

                            {/* actions */}
                            {
                                (capable?.canDelete || capable?.canEdit) &&
                                <div className="hidden md:flex items-center justify-center gap-2">
                                    {
                                        capable?.canEdit &&
                                        <button onClick={() => handleEdit(product?._id)}
                                            className=" cursor-pointer p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all hover:scale-105" title="Edit"
                                        >
                                            <Edit2 size={17} />
                                        </button>
                                    }
                                    {
                                        capable?.canDelete &&
                                        <button onClick={() => handleDelete(product?._id)}
                                            className="cursor-pointer p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all hover:scale-105" title="Delete"
                                        >
                                            <Trash2 size={17} />
                                        </button>
                                    }
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default Products_page;