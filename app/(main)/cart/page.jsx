"use client";
import { useSelector, useDispatch } from "react-redux";
import { Trash2, Plus, Minus, Tag, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from "@/redux/features/addToCart/slice_addtoCart";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
    const dispatch = useDispatch();
    const { cartProducts, totalItems, totalPrice } = useSelector(
        (state) => state.cart
    );
    const [couponCode, setCouponCode] = useState("");

    const handleRemove = (item) => {
        dispatch(
            removeFromCart({
                _id: item._id,
                selectedColor: item.selectedColor,
                selectedSize: item.selectedSize,
            })
        );
    };

    const handleIncrease = (item) => {
        dispatch(
            increaseQuantity({
                _id: item._id,
                selectedColor: item.selectedColor,
                selectedSize: item.selectedSize,
            })
        );
    };

    const handleDecrease = (item) => {
        dispatch(
            decreaseQuantity({
                _id: item._id,
                selectedColor: item.selectedColor,
                selectedSize: item.selectedSize,
            })
        );
    };

    const handleClearCart = () => {
        if (confirm("Are you sure you want to clear your cart?")) {
            dispatch(clearCart());
        }
    };

    const getItemPrice = (item) => {
        return item.sale?.active ? item.sale.price : item.price;
    };

    const getItemSubtotal = (item) => {
        return getItemPrice(item) * item.quantity;
    };

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-7xl mx-auto px-4">
                {cartProducts.length === 0 ? (
                    <div className="text-center py-16">
                        <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-600 mb-8">Add some products to get started</p>
                        <Link href='/shop'>
                            <button className="px-8 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
                                <p className="text-gray-600 mt-1">{totalItems} items in your cart</p>
                            </div>
                            <button
                                onClick={handleClearCart}
                                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                                Clear Cart
                            </button>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Left Section - Cart Items */}
                            <div className="lg:col-span-2">
                                <div className="border border-gray-200">
                                    {/* Table Header - Hidden on mobile */}
                                    <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
                                        <div className="col-span-6">Product</div>
                                        <div className="col-span-2 text-center">Price</div>
                                        <div className="col-span-2 text-center">Quantity</div>
                                        <div className="col-span-2 text-right">Total</div>
                                    </div>

                                    {/* Cart Items */}
                                    <div className="divide-y divide-gray-200">
                                        {cartProducts.map((item, index) => (
                                            <div key={`${item._id}-${item.selectedColor}-${item.selectedSize}-${index}`} className="p-4">
                                                {/* Mobile & Tablet Layout */}
                                                <div className="md:hidden">
                                                    <div className="flex gap-3 relative">
                                                        {/* Delete Button - Top Right */}
                                                        <button
                                                            onClick={() => handleRemove(item)}
                                                            className="absolute -top-2 -right-2 bg-white border border-gray-300 p-1.5 hover:bg-gray-50 z-10"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>

                                                        {/* Product Image */}
                                                        <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                                                            {item.image ? (
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                                    <Tag className="w-8 h-8" />
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Product Details */}
                                                        <div className="flex-1 min-w-0 pr-8">
                                                            <Link href={`/shop/${item._id}/${item.slug}`}>
                                                                <h3 className="font-medium text-gray-900 text-sm mb-2 hover:underline line-clamp-2">
                                                                    {item.name}
                                                                </h3>
                                                            </Link>

                                                            {/* Variants */}
                                                            <div className="flex flex-wrap gap-1.5 mb-2">
                                                                {item.selectedColor && (
                                                                    <span className="text-xs px-2 py-0.5 bg-gray-100 border border-gray-200">
                                                                        {item.selectedColor}
                                                                    </span>
                                                                )}
                                                                {item.selectedSize && (
                                                                    <span className="text-xs px-2 py-0.5 bg-gray-100 border border-gray-200">
                                                                        {item.selectedSize}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* Price */}
                                                            <div className="font-semibold text-gray-900 text-sm mb-3">
                                                                ৳{getItemPrice(item).toFixed(2)}
                                                            </div>

                                                            {/* Quantity & Total */}
                                                            <div className="flex items-center justify-between gap-3">
                                                                {/* Quantity Controls */}
                                                                <div className="flex items-center border border-gray-300">
                                                                    <button
                                                                        onClick={() => handleDecrease(item)}
                                                                        disabled={item.quantity <= 1}
                                                                        className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                                                    >
                                                                        <Minus className="w-3 h-3" />
                                                                    </button>
                                                                    <input
                                                                        type="text"
                                                                        value={item.quantity}
                                                                        readOnly
                                                                        className="w-10 h-7 text-center border-x border-gray-300 text-sm font-medium"
                                                                    />
                                                                    <button
                                                                        onClick={() => handleIncrease(item)}
                                                                        disabled={item.quantity >= item.stock?.quantity}
                                                                        className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                                                    >
                                                                        <Plus className="w-3 h-3" />
                                                                    </button>
                                                                </div>

                                                                {/* Total Price */}
                                                                <div className="font-bold text-gray-900">
                                                                    ৳{getItemSubtotal(item).toFixed(2)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Desktop Layout */}
                                                <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                                                    {/* Product Info - 6 cols */}
                                                    <div className="md:col-span-6 flex gap-4">
                                                        {/* Product Image */}
                                                        <div className="w-20 h-20 bg-gray-100 flex-shrink-0">
                                                            {item.image ? (
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                                    <Tag className="w-8 h-8" />
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Product Details */}
                                                        <div className="flex-1 min-w-0">
                                                            <Link href={`/shop/${item._id}/${item.slug}`}>
                                                                <h3 className="font-medium text-gray-900 text-sm mb-2 hover:underline">
                                                                    {item.name}
                                                                </h3>
                                                            </Link>

                                                            {/* Variants */}
                                                            <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                                                                {item.selectedColor && (
                                                                    <span className="px-2 py-0.5 bg-gray-100 border border-gray-200">
                                                                        {item.selectedColor}
                                                                    </span>
                                                                )}
                                                                {item.selectedSize && (
                                                                    <span className="px-2 py-0.5 bg-gray-100 border border-gray-200">
                                                                        Size: {item.selectedSize}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Price - 2 cols */}
                                                    <div className="md:col-span-2 text-center">
                                                        <span className="font-medium text-gray-900">
                                                            ৳{getItemPrice(item).toFixed(2)}
                                                        </span>
                                                    </div>

                                                    {/* Quantity - 2 cols */}
                                                    <div className="md:col-span-2 flex justify-center">
                                                        <div className="flex items-center border border-gray-300">
                                                            <button
                                                                onClick={() => handleDecrease(item)}
                                                                disabled={item.quantity <= 1}
                                                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </button>
                                                            <input
                                                                type="text"
                                                                value={item.quantity}
                                                                readOnly
                                                                className="w-12 h-8 text-center border-x border-gray-300 text-sm font-medium"
                                                            />
                                                            <button
                                                                onClick={() => handleIncrease(item)}
                                                                disabled={item.quantity >= item.stock?.quantity}
                                                                className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Total - 2 cols */}
                                                    <div className="md:col-span-2 flex items-center justify-end gap-4">
                                                        <span className="font-semibold text-gray-900">
                                                            ৳{getItemSubtotal(item).toFixed(2)}
                                                        </span>
                                                        {/* Remove button */}
                                                        <button
                                                            onClick={() => handleRemove(item)}
                                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Coupon Section */}
                                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                placeholder="Enter coupon code"
                                                className="flex-1 px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-900"
                                            />
                                            <button className="px-6 py-2.5 bg-black text-white font-medium hover:bg-gray-800 transition-colors whitespace-nowrap">
                                                Apply Coupon
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Section - Cart Summary */}
                            <div className="lg:col-span-1">
                                <div className="border border-gray-200 p-6 sticky top-4">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>

                                    <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                                        <div className="flex justify-between text-sm text-gray-700">
                                            <span>Subtotal ({totalItems} items)</span>
                                            <span className="font-medium">৳{totalPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-700">
                                            <span>Shipping</span>
                                            <span className="font-medium">Free</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-base font-semibold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-gray-900">৳{totalPrice.toFixed(2)}</span>
                                    </div>

                                    <Link href="/checkout">
                                        <button className="w-full py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors mb-3">
                                            Proceed to Checkout
                                        </button>
                                    </Link>

                                    <Link href="/shop">
                                        <button className="w-full py-3 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                                            Continue Shopping
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}