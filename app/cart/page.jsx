"use client";
import { useSelector, useDispatch } from "react-redux";
import { Trash2, Plus, Minus, Tag } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from "@/redux/features/addToCart/slice_addtoCart";
import Link from "next/link";
import Image from "next/image";
import { allContext } from "@/Auth/Authprovider";

export default function CartPage() {
    const { userfromDB } = useContext(allContext)
    const dispatch = useDispatch();
    const { cartProducts, totalItems, totalPrice } = useSelector(
        (state) => state.cart
    );
    const [couponCode, setCouponCode] = useState("");
    const [shippingMethod, setShippingMethod] = useState("free");
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [address, setAddress] = useState({
        division: userfromDB?.address?.division || "",
        city: userfromDB?.address?.city || "",
        detailedAddress: userfromDB?.address?.address || ""
    });
    const [tempAddress, setTempAddress] = useState({
        division: userfromDB?.address?.division || "",
        city: userfromDB?.address?.city || "",
        detailedAddress: userfromDB?.address?.address || ""
    });

    useEffect(() => {
        if (userfromDB?.address) {
            setAddress({
                division: userfromDB.address.division || "",
                city: userfromDB.address.city || "",
                detailedAddress: userfromDB.address.address || ""
            });

            setTempAddress({
                division: userfromDB.address.division || "",
                city: userfromDB.address.city || "",
                detailedAddress: userfromDB.address.address || ""
            });
        }
    }, [userfromDB]);


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

    const shippingCost = shippingMethod === "free" ? 0 : 10;
    const finalTotal = totalPrice + shippingCost;

    const handleUpdateAddress = () => {
        setAddress(tempAddress);
        setShowAddressForm(false);
    };

    const handleAddressChange = (field, value) => {
        setTempAddress(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const toggleAddressForm = () => {
        if (!showAddressForm) {
            setTempAddress(address);
        }
        setShowAddressForm(!showAddressForm);
    };

    return (
        <div className=" py-8 container mx-auto px-5">
            {
                cartProducts.length === 0
                    ? (
                        <div className="text-center pb-8 sm:p-12">
                            <div className="pr-3">
                                <Image src="/emptyCart.svg" alt="Empty Cart" width={320} height={10} className=" mx-auto" />
                            </div>
                            <p className="-mt-10 lg:pl-5 text-[24px] text-center font-semibold text-red-700"> Your cart is currently empty.</p>
                            <Link href='/shop'><button className=" lg:ml-4 cursor-pointer text-md mt-7 font-semibold rounded-sm px-6 py-2.5 bg-gray-200">Retun to shop</button></Link>
                        </div>
                    )
                    : (
                        <div className="max-w-7xl mx-auto ">
                            <div className="grid lg:grid-cols-3 gap-6">
                                {/* Left Section - Cart Items */}
                                <div className="lg:col-span-2">
                                    {/* Free Shipping Banner - Hidden on mobile */}
                                    <div className="hidden  bg-white rounded-lg border border-gray-200 p-4 mb-6">
                                        <div className="flex items-center gap-2 text-gray-700 mb-2">
                                            <Tag className="w-4 h-4" />
                                            <span className="font-medium">
                                                Your order qualifies for free shipping!
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full w-full"></div>
                                        </div>
                                    </div>

                                    {/* Cart Items */}
                                    {cartProducts.length === 0 ? (
                                        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center text-gray-400">
                                            <p className="text-lg">Your cart is empty</p>
                                            <p className="text-sm mt-2">Add some products to get started</p>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Mobile/Tablet View */}
                                            <div className="lg:hidden space-y-4">
                                                {/* Free Shipping Banner for mobile */}
                                                <div className=" hidden bg-white rounded-lg border border-red-200 p-3">
                                                    <div className="flex items-center gap-2 text-sm mb-2">
                                                        <Tag className="w-4 h-4 text-red-500" />
                                                        <span className="font-medium text-gray-700">
                                                            Add <span className="text-red-500">৳1.11</span> to cart and get free shipping!
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                        <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                                                    </div>
                                                </div>

                                                {/* Product Header */}
                                                <div className="bg-white rounded-t-lg border border-gray-200 px-4 py-3">
                                                    <div className="flex justify-between text-sm font-semibold text-gray-700">
                                                        <span>Product</span>
                                                        <span>Quantity</span>
                                                    </div>
                                                </div>

                                                {/* Product Items */}
                                                <div className="bg-white0 -mt-4 rounded-b-lg border border-t-0 border-gray-200 divide-y divide-gray-200">
                                                    {cartProducts.map((item, index) => (
                                                        <div key={`${item._id}-${item.selectedColor}-${item.selectedSize}-${index}`} className="p-4">
                                                            <div className="flex gap-3">
                                                                <button
                                                                    onClick={() => handleRemove(item)}
                                                                    className="cursor-pointer text-red-500 hover:bg-red-50 rounded p-1 h-fit"
                                                                >
                                                                    <Trash2 className="w-5 h-5" />
                                                                </button>
                                                                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                                                                    {item.image ? (
                                                                        <img
                                                                            src={item.image}
                                                                            alt={item.name}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                                            <Tag className="w-6 h-6" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <Link href={`/shop/${item._id}/${item.slug}`}>
                                                                        <h3 className="font-medium hover:underline text-gray-800 text-sm leading-tight mb-1">
                                                                            {item.name}
                                                                        </h3>
                                                                    </Link>
                                                                    <div className="text-xs text-gray-500 space-y-0.5">
                                                                        {item.selectedColor && (
                                                                            <div className="flex items-center gap-1">
                                                                                <span>Color:</span>
                                                                                <span className="font-medium capitalize">
                                                                                    {item.selectedColor}
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                        {item.selectedSize && (
                                                                            <div>
                                                                                Size: <span className="font-medium">{item.selectedSize}</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col items-end gap-2">
                                                                    <div className="flex items-center border border-gray-300 rounded">
                                                                        <button
                                                                            onClick={() => handleDecrease(item)}
                                                                            disabled={item.quantity <= 1}
                                                                            className="cursor-pointer px-2 py-1 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                                                        >
                                                                            <Minus className="w-3 h-3" />
                                                                        </button>
                                                                        <input
                                                                            type="text"
                                                                            value={item.quantity}
                                                                            readOnly
                                                                            className="w-8 text-center border-x border-gray-300 py-1 text-sm font-medium"
                                                                        />
                                                                        <button
                                                                            onClick={() => handleIncrease(item)}
                                                                            disabled={item.quantity >= item.stock?.quantity}
                                                                            className="cursor-pointer px-2 py-1 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                                                                        >
                                                                            <Plus className="w-3 h-3" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Coupon Section Mobile */}
                                                <div className="bg-white rounded-lg border border-gray-200 p-4">
                                                    <label className="block text-gray-700 font-medium text-sm mb-2">
                                                        Coupon:
                                                    </label>
                                                    <div className="flex gap-2 mb-3">
                                                        <input
                                                            type="text"
                                                            value={couponCode}
                                                            onChange={(e) => setCouponCode(e.target.value)}
                                                            placeholder="Coupon code"
                                                            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button className="flex-1 py-2.5 bg-cyan-500 text-white font-medium rounded hover:bg-cyan-600 transition-colors text-sm">
                                                            Apply coupon
                                                        </button>
                                                        <button
                                                            onClick={handleClearCart}
                                                            className="cursor-pointer flex-1 py-2.5 bg-white text-gray-700 font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
                                                        >
                                                            Clear All
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>


                                            {/* Desktop View */}
                                            <div className="hidden lg:block">
                                                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                                    {/* Table Header */}
                                                    <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-b-gray-200 font-semibold text-gray-700 text-sm">
                                                        <div className="col-span-5">Product</div>
                                                        <div className="col-span-2 text-center">Price</div>
                                                        <div className="col-span-3 text-center">Quantity</div>
                                                        <div className="col-span-2 text-right">Subtotal</div>
                                                    </div>

                                                    {/* Cart Items */}
                                                    <div className="divide-y divide-gray-200">
                                                        {cartProducts.map((item, index) => (
                                                            <div
                                                                key={`${item._id}-${item.selectedColor}-${item.selectedSize}-${index}`}
                                                                className="grid grid-cols-12 gap-4 p-4 items-center"
                                                            >
                                                                {/* Product Info */}
                                                                <div className="col-span-5 flex gap-3">
                                                                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden ">
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
                                                                    <div className="flex-1 min-w-0">
                                                                        <Link href={`/shop/${item._id}/${item.slug}`}>
                                                                            <h3 className="font-medium hover:underline text-gray-800 text-sm leading-tight">
                                                                                {item.name}
                                                                            </h3>
                                                                        </Link>
                                                                        <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                                                                            {item.selectedColor && (
                                                                                <div className="flex items-center gap-1">
                                                                                    <span>Color:</span>
                                                                                    <span className="font-medium capitalize">
                                                                                        {item.selectedColor}
                                                                                    </span>
                                                                                </div>
                                                                            )}
                                                                            {item.selectedSize && (
                                                                                <div>
                                                                                    Size: <span className="font-medium">{item.selectedSize}</span>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Price */}
                                                                <div className="col-span-2 text-center">
                                                                    <span className="font-semibold text-gray-800">
                                                                        ৳{getItemPrice(item).toFixed(2)}
                                                                    </span>
                                                                </div>

                                                                {/* Quantity Controls */}
                                                                <div className="col-span-3 flex items-center justify-center gap-2">
                                                                    <div className="flex items-center border border-gray-300 rounded">
                                                                        <button
                                                                            onClick={() => handleDecrease(item)}
                                                                            disabled={item.quantity <= 1}
                                                                            className="cursor-pointer px-3 py-1 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                                                        >
                                                                            <Minus className="w-4 h-4" />
                                                                        </button>
                                                                        <input
                                                                            type="text"
                                                                            value={item.quantity}
                                                                            readOnly
                                                                            className="w-12 text-center border-x border-gray-300 py-1 font-medium"
                                                                        />
                                                                        <button
                                                                            onClick={() => handleIncrease(item)}
                                                                            disabled={item.quantity >= item.stock?.quantity}
                                                                            className="cursor-pointer px-3 py-1 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                                                        >
                                                                            <Plus className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                {/* Subtotal & Remove */}
                                                                <div className="col-span-2 flex items-center justify-end gap-3">
                                                                    <span className="font-semibold text-gray-800">
                                                                        ৳{getItemSubtotal(item).toFixed(2)}
                                                                    </span>
                                                                    <button
                                                                        onClick={() => handleRemove(item)}
                                                                        className="cursor-pointer p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                                                                    >
                                                                        <Trash2 className="w-5 h-5" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Coupon Section Desktop */}
                                                <div className="bg-white rounded-lg border border-gray-200 p-4 mt-6">
                                                    <div className="flex gap-3 items-center">
                                                        <label className="text-gray-700 font-medium whitespace-nowrap">
                                                            Coupon:
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={couponCode}
                                                            onChange={(e) => setCouponCode(e.target.value)}
                                                            placeholder="Coupon code"
                                                            className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                        />
                                                        <button className="px-6 py-2 bg-cyan-500 text-white font-medium rounded hover:bg-cyan-600 transition-colors">
                                                            Apply coupon
                                                        </button>
                                                        <button
                                                            onClick={handleClearCart}
                                                            className="cursor-pointer px-6 py-2 bg-white text-gray-700 font-medium rounded border border-gray-300 hover:bg-gray-50 transition-colors"
                                                        >
                                                            Clear All
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Right Section - Cart Totals */}
                                {cartProducts.length > 0 && (
                                    <div className="lg:col-span-1">
                                        <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
                                            <h2 className="text-xl font-bold text-gray-800 mb-6">
                                                Cart totals
                                            </h2>

                                            {/* Subtotal */}
                                            <div className="flex justify-between items-center py-3 border-b">
                                                <span className="text-gray-600">Subtotal</span>
                                                <span className="font-semibold text-gray-800">
                                                    ৳{totalPrice.toFixed(2)}
                                                </span>
                                            </div>

                                            {/* Shipping Options */}
                                            <div className="py-4 border-b">
                                                <div className="flex justify-between items-start mb-3">
                                                    <span className="text-gray-600">Shipping</span>
                                                    <div className="text-right text-sm">
                                                        <span className="text-gray-500">Shipping to</span>{" "}
                                                        <span className="font-semibold">{address.division}, {address.city},{address.detailedAddress}</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2 mb-3">
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="shipping"
                                                            value="free"
                                                            checked={shippingMethod === "free"}
                                                            onChange={(e) => setShippingMethod(e.target.value)}
                                                            className="w-4 h-4 text-red-500 focus:ring-red-500"
                                                        />
                                                        <span className="text-sm text-gray-700">Free shipping</span>
                                                    </label>

                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="shipping"
                                                            value="local"
                                                            checked={shippingMethod === "local"}
                                                            onChange={(e) => setShippingMethod(e.target.value)}
                                                            className="w-4 h-4 text-gray-400 focus:ring-gray-400"
                                                        />
                                                        <span className="text-sm text-gray-700">Local pickup</span>
                                                    </label>
                                                </div>

                                                <button
                                                    onClick={toggleAddressForm}
                                                    className="text-sm text-red-500 hover:underline"
                                                >
                                                    Change address
                                                </button>

                                                {/* Address Update Form */}
                                                <div
                                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${showAddressForm ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                                                        }`}
                                                >
                                                    <div className="p-4 bg-gray-50 rounded-lg space-y-4 border border-gray-200">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Division <span className="text-red-500">*</span>
                                                            </label>
                                                            <select
                                                                value={tempAddress.division}
                                                                onChange={(e) => handleAddressChange('division', e.target.value)}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                                            >
                                                                <option value="">Select a Division</option>
                                                                <option value="Dhaka">Dhaka</option>
                                                                <option value="Chittagong">Chittagong</option>
                                                                <option value="Sylhet">Sylhet</option>
                                                                <option value="Rajshahi">Rajshahi</option>
                                                                <option value="Khulna">Khulna</option>
                                                                <option value="Barisal">Barisal</option>
                                                                <option value="Rangpur">Rangpur</option>
                                                                <option value="Mymensingh">Mymensingh</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Town / City <span className="text-red-500">*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={tempAddress.city}
                                                                onChange={(e) => handleAddressChange('city', e.target.value)}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                                Detailed Address
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={tempAddress.detailedAddress}
                                                                onChange={(e) => handleAddressChange('detailedAddress', e.target.value)}
                                                                placeholder=""
                                                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                                            />
                                                        </div>

                                                        <button
                                                            onClick={handleUpdateAddress}
                                                            className="w-full bg-gray-300 text-gray-700 py-2 rounded font-medium hover:bg-gray-400 transition-colors"
                                                        >
                                                            Update
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Total */}
                                            <div className="flex justify-between items-center py-4">
                                                <span className="text-gray-700 font-medium">Total</span>
                                                <span className="text-2xl font-bold text-red-500">
                                                    ৳{finalTotal.toFixed(2)}
                                                </span>
                                            </div>

                                            {/* Checkout Button */}
                                            <button className="cursor-pointer w-full bg-red-500 text-white py-3 rounded font-semibold hover:bg-red-600 transition-colors">
                                                Proceed to checkout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
            }
        </div>
    );
}