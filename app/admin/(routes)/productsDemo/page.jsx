'use client'
import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { RxDownload } from 'react-icons/rx';
import { HiOutlinePlusSm } from "react-icons/hi";
import { Edit2, Trash2, MoreVertical } from 'lucide-react';

const Products_page = () => {
    const [openMenuId, setOpenMenuId] = useState(null);

    const products = [
        {
            id: 1,
            name: "Performance Athletic Hoodie",
            image: "https://res.cloudinary.com/dd12wnlx0/image/upload/v1762929629/au2bichnec7yw8sqqvza.jpg",
            category: "Clothing",
            price: 1850,
            stock: 12,
            status: "In Stock"
        },
        {
            id: 2,
            name: "Classic Denim Jacket",
            image: "https://res.cloudinary.com/dd12wnlx0/image/upload/v1762929273/otqtq3uiytns2lvayuuq.jpg",
            category: "Outerwear",
            price: 2200,
            stock: 8,
            status: "In Stock"
        },
        {
            id: 3,
            name: "Slim Fit Cargo Trouser",
            image: "https://res.cloudinary.com/dd12wnlx0/image/upload/v1764506413/xmafzkdxxofpmpzjbcob.webp",
            category: "Cargo Trouser",
            price: 1700,
            stock: 3,
            status: "Low Stock"
        },
        {
            id: 4,
            name: "Quilted Puffer Coat",
            image: "https://res.cloudinary.com/dd12wnlx0/image/upload/v1762956918/w8srois0kk4khxqg1lwr.jpg",
            category: "Outerwear",
            price: 3400,
            stock: 15,
            status: "In Stock"
        },
        {
            id: 5,
            name: "Soft Knit Cardigan",
            image: "https://res.cloudinary.com/dd12wnlx0/image/upload/v1764520307/kibj3p5rd6xu0utlmejw.webp",
            category: "Clothing",
            price: 1700,
            stock: 0,
            status: "Out of Stock"
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "In Stock":
                return "bg-emerald-50 text-emerald-700 border border-emerald-200";
            case "Low Stock":
                return "bg-amber-50 text-amber-700 border border-amber-200";
            case "Out of Stock":
                return "bg-red-50 text-red-700 border border-red-200";
            default:
                return "bg-gray-50 text-gray-700 border border-gray-200";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            {/* Header Section */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Products</h1>
                <p className="text-gray-600">Manage your product inventory</p>
            </div>

            {/* Action Bar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                            <FiFilter size={16} />
                            <span>Filter</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                            <RxDownload size={18} />
                            <span>Export</span>
                        </button>
                    </div>
                    <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-semibold shadow-sm">
                        <HiOutlinePlusSm size={20} />
                        <span>Add Product</span>
                    </button>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {/* Desktop/Tablet Header */}
                <div className="hidden md:grid md:grid-cols-[2fr_1.2fr_1fr_0.9fr_1.1fr_1fr] gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</div>
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</div>
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</div>
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</div>
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</div>
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</div>
                </div>

                {/* Products List */}
                <div className="divide-y divide-gray-100">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="md:grid md:grid-cols-[2fr_1.2fr_1fr_0.9fr_1.1fr_1fr] gap-4 px-4 md:px-6 py-4 hover:bg-gray-50 transition-colors"
                        >
                            {/* Mobile Layout */}
                            <div className="md:hidden">
                                {/* Product Card */}
                                <div className="flex gap-3">
                                    {/* Product Image */}
                                    <div className="relative">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-24 h-24 rounded-lg object-cover flex-shrink-0 border border-gray-200 shadow-sm"
                                        />
                                        {/* Stock Indicator Badge on Image */}
                                        {product.stock === 0 && (
                                            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">Out of Stock</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1.5 line-clamp-2">
                                                    {product.name}
                                                </h3>
                                                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded inline-block">
                                                    {product.category}
                                                </span>
                                            </div>

                                            {/* 3 Dot Menu */}
                                            <div className="relative">
                                                <button
                                                    onClick={() => setOpenMenuId(openMenuId === product.id ? null : product.id)}
                                                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                                    aria-label="More options"
                                                >
                                                    <MoreVertical size={18} className="text-gray-600" />
                                                </button>

                                                {/* Dropdown Menu */}
                                                {openMenuId === product.id && (
                                                    <>
                                                        {/* Backdrop */}
                                                        <div
                                                            className="fixed inset-0 z-10"
                                                            onClick={() => setOpenMenuId(null)}
                                                        ></div>

                                                        {/* Menu */}
                                                        <div className="absolute right-0 top-8 z-20 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[140px]">
                                                            <button
                                                                className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-left text-sm text-gray-700 transition-colors"
                                                                onClick={() => setOpenMenuId(null)}
                                                            >
                                                                <Edit2 size={16} className="text-blue-600" />
                                                                <span>Edit</span>
                                                            </button>
                                                            <button
                                                                className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-left text-sm text-red-600 transition-colors"
                                                                onClick={() => setOpenMenuId(null)}
                                                            >
                                                                <Trash2 size={16} />
                                                                <span>Delete</span>
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div className="mb-3">
                                            <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${getStatusColor(product.status)}`}>
                                                {product.status}
                                            </span>
                                        </div>

                                        {/* Price and Stock Row */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-500 mb-0.5">Price</span>
                                                <span className="text-base font-bold text-gray-900">৳{product.price.toLocaleString()}</span>
                                            </div>
                                            <div className="h-8 w-px bg-gray-200"></div>
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-500 mb-0.5">Stock</span>
                                                <span className={`text-base font-semibold ${product.stock < 5 ? 'text-amber-600' : 'text-gray-700'}`}>
                                                    {product.stock}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop/Tablet Layout */}
                            <div className="hidden md:flex items-center gap-3">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-gray-200"
                                />
                                <span className="font-medium text-gray-900 line-clamp-2 text-sm">
                                    {product.name}
                                </span>
                            </div>

                            <div className="hidden md:flex items-center text-gray-700 text-sm">
                                {product.category}
                            </div>

                            <div className="hidden md:flex items-center text-gray-900 font-semibold text-sm">
                                ৳{product.price.toLocaleString()}
                            </div>

                            <div className="hidden md:flex items-center text-gray-700 text-sm">
                                <span className="font-medium">{product.stock}</span>
                                <span className="text-gray-500 ml-1">units</span>
                            </div>

                            <div className="hidden md:flex items-center">
                                <span className={`px-3 py-1.5 rounded-md text-xs font-medium ${getStatusColor(product.status)}`}>
                                    {product.status}
                                </span>
                            </div>

                            <div className="hidden md:flex items-center gap-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                    <Edit2 size={18} />
                                </button>
                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination (Optional) */}
            <div className="mt-6 flex justify-between items-center">
                <p className="text-sm text-gray-600">Showing 1-5 of 5 products</p>
            </div>
        </div>
    );
};

export default Products_page;