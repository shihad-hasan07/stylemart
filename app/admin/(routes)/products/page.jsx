'use client'
import { useGetAllProductsQuery } from '@/redux/features/All_Products/_allProduct_api';
import Routes_heading_texts from '../../components/shared/Routes_heading_texts';
import { FiFilter } from 'react-icons/fi';
import { RxDownload } from 'react-icons/rx';
import { HiOutlinePlusSm } from "react-icons/hi";
import { Edit2, MoreVertical, Trash2 } from 'lucide-react';
import { useContext, useState } from 'react';
import { allContext } from '@/Auth/Authprovider';
import Products_page_loading from '../../components/Loader/Products_page_loading';
import Swal from 'sweetalert2';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const Products_page = () => {
    const { data, error, refetch, isLoading } = useGetAllProductsQuery(undefined, { refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true, });
    const { user, logOut, loading, userfromDB } = useContext(allContext);
    const [openMenuId, setOpenMenuId] = useState(null);
    const axiosSecure = useAxiosSecure()
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
    if (isLoading) {
        return <Products_page_loading />
    }

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
        console.log('edit', id);
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

    return (
        <div>
            <Routes_heading_texts name={'products'} total={products?.length} />

            <div className='px-6 m-5 bg-white rounded-xl py-5'>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-2.5'>
                        <button className='cursor-pointer flex items-center gap-1.5 text-sm sm:text-base border border-gray-400 rounded-md px-4 sm:px-5.5 py-2'><FiFilter /><span>Filter</span></button>
                        <button className='cursor-pointer flex items-center gap-1.5 text-sm sm:text-base border border-gray-400 rounded-md px-3 sm:px-4 py-2'><RxDownload /><span>Export</span></button>
                    </div>
                    {/*  add products button */}
                    {
                        role == 'staff' ? <button className=''>Inventory</button>
                            : <button className='cursor-pointer flex items-center gap-1.5 border border-gray-400 rounded-md px-3 text-sm sm:text-base sm:px-5.5 py-2 font-semibold bg-red-500 hover:opacity-90 text-white'><HiOutlinePlusSm size={22} /><span>Add product</span></button>
                    }
                </div>
            </div>


            <div className=" bg-white rounded-xl mx-5 my-5 overflow-hidden">

                {/* Header - Hidden on mobile */}
                <div className={`hidden ${(capable?.canDelete || capable?.canEdit) ? ' md:grid md:grid-cols-[0.1fr_2fr_1.2fr_1fr_0.8fr_1fr] lg:grid-cols-[0.1fr_1.7fr_0.8fr_0.9fr_0.9fr_0.8fr_0.6fr] '
                    : ' md:grid md:grid-cols-[2fr_1.2fr_1fr_0.8fr] lg:grid-cols-[1.7fr_0.8fr_0.9fr_0.9fr_0.8fr] '}  gap-4 px-6 py-4 border-b border-gray-200`}>
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

                {/* Products List */}
                <div className="divide-y divide-gray-200">
                    {products.map((product, idx) => (
                        <div key={product._id}
                            className={`${(capable?.canDelete || capable?.canEdit) ? 'md:grid md:grid-cols-[0.1fr_2fr_1.2fr_1fr_0.8fr_1fr] lg:grid-cols-[0.1fr_1.7fr_0.8fr_0.9fr_0.9fr_0.8fr_0.6fr]'
                                : 'md:grid md:grid-cols-[2fr_1.2fr_1fr_0.8fr] lg:grid-cols-[1.7fr_0.8fr_0.9fr_0.9fr_0.8fr]'}   gap-4 px-4 md:px-6 py-4 hover:bg-gray-50 transition-colors`}
                        >
                            {/* for small device */}
                            <div className="md:hidden">
                                {/* Compact Product Card */}
                                <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-gray-200">
                                    {/* Product Image */}
                                    <div className="relative">
                                        <img
                                            src={product?.images[0]}
                                            alt={product?.name}
                                            className="w-20 h-20 rounded-lg object-cover shrink-0 border border-gray-200 shadow-sm"
                                        />
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
                                <div className="relative shrink-0">
                                    <img
                                        src={product?.images[0]}
                                        alt={product?.name}
                                        className="w-16 h-16 rounded-lg object-cover border border-gray-200 shadow-sm"
                                    />
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