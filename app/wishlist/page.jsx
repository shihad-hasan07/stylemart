"use client";
import { useSelector, useDispatch } from "react-redux";
import { X, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { removeFromWishlist, clearWishlist } from "@/redux/features/addToWishlist/slice_addtoWishlist";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
    const dispatch = useDispatch();
    const router = useRouter()

    const { wishlistProducts } = useSelector((state) => state.wishlist);

    const handleRemove = (item) => {
        dispatch(removeFromWishlist({ _id: item._id }));
    };

    const handleClearWishlist = () => {
        if (confirm("Are you sure you want to clear your wishlist?")) {
            dispatch(clearWishlist());
        }
    };

    const handleAddToCart = (item) => {
        router.push(`/shop/${item._id}/${item.slug}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="py-8 container mx-auto px-5">
            {wishlistProducts.length === 0 ? (
                <div className="text-center pb-8 sm:p-12">
                    <div className="mx-auto w-64  flex items-center justify-center  rounded-lg mb-6">
                        <Heart className="w-24 h-24 text-gray-300" />
                    </div>
                    <p className="text-[24px] text-center font-semibold text-gray-700 mb-2">
                        Your wishlist is empty
                    </p>
                    <p className="text-gray-500 mb-6">
                        Save your favorite items to your wishlist
                    </p>
                    <Link href="/shop">
                        <button className="cursor-pointer text-md font-semibold rounded-sm px-6 py-2.5 bg-red-500 text-white hover:bg-red-600 transition-colors">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            My Wishlist ({wishlistProducts.length})
                        </h1>
                        <button
                            onClick={handleClearWishlist}
                            className="cursor-pointer px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                            Clear All
                        </button>
                    </div>

                    {/* Wishlist Table */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        {/* Desktop Header */}
                        <div className="hidden pr-4 md:grid grid-cols-11 gap-4 py-4 pl-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 text-sm">
                            <div className="col-span-4">Product</div>
                            <div className="col-span-2 ">Price</div>
                            <div className="col-span-3 ">Date Added</div>
                            <div className="col-span-2 ">Add to cart</div>
                        </div>

                        {/* Mobile Header */}
                        <div className="md:hidden grid grid-cols-2 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 text-sm">
                            <div>Product</div>
                            <div className="text-right mr-12">Add to cart</div>
                        </div>

                        {/* Wishlist Items */}
                        <div className="divide-y divide-gray-200">
                            {wishlistProducts.map((item, index) => (
                                <div
                                    key={`${item._id}-${index}`}
                                    className="p-4"
                                >
                                    {/* Desktop Layout */}
                                    <div className="hidden md:grid grid-cols-11 gap-4 items-center">
                                        {/* Product Info */}
                                        <div className="col-span-4 flex gap-3">
                                            <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden ">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <Heart className="w-8 h-8" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <Link href={`/shop/${item._id}/${item.slug}`}>
                                                    <h3 className=" hover:underline font-medium text-gray-800 text-sm leading-tight">
                                                        {item.name}
                                                    </h3>
                                                </Link>
                                                <span
                                                    className={`mt-3.5 inline-block px-3 py-1 rounded text-sm font-medium ${item.inStock
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {item.inStock ? "In Stock" : "Out of Stock"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="col-span-2 ">
                                            <div className="flex flex-col  gap-1">
                                                {item.salePrice ? (
                                                    <>
                                                        <span className="text-gray-400 line-through text-sm">
                                                            ৳{item.originalPrice.toFixed(2)}
                                                        </span>
                                                        <span className="font-semibold text-red-500">
                                                            ৳{item.salePrice.toFixed(2)}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="font-semibold text-gray-800">
                                                        ৳{item.originalPrice.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Date Added */}
                                        <div className="col-span-3  text-sm text-gray-600">
                                            {formatDate(item.addedAt)}
                                        </div>

                                        {/* Add to Cart */}
                                        <div className="col-span-1 flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleAddToCart(item)}
                                                disabled={!item.inStock}
                                                className="py-2 px-3 cursor-pointer bg-red-500 flex gap-2 items-center text-white rounded hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                                title="Add to cart"
                                            >
                                                <span className="w-20 hidden lg:flex">Add to cart</span><ShoppingCart className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className=" col-span-1 flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleRemove(item)}
                                                className="p-2 cursor-pointer text-red-500 hover:bg-red-50 rounded transition-colors"
                                                title="Remove from wishlist"
                                            >
                                                <X className="w-7 h-7" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Mobile Layout */}
                                    <div className="md:hidden">
                                        <div className="flex gap-3">
                                            <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden ">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <Heart className="w-6 h-6" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <Link href={`/shop/${item._id}/${item.slug}`}>
                                                    <h3 className="hover:underline font-medium text-gray-800 text-sm leading-tight mb-2">
                                                        {item.name}
                                                    </h3>
                                                </Link>
                                                <p className="mb-2.5 text-xs text-gray-500">
                                                    Added: {formatDate(item.addedAt)}
                                                </p>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span
                                                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${item.inStock
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                            }`}
                                                    >
                                                        {item.inStock ? "In Stock" : "Out of Stock"}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* add to cart */}
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col gap-2">
                                                    <button
                                                        onClick={() => handleAddToCart(item)}
                                                        disabled={!item.inStock}
                                                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                                        title="Add to cart"
                                                    >
                                                        <ShoppingCart className="w-5 h-5" />
                                                    </button>
                                                </div>
                                                {/* add to cart */}
                                                <div className="flex flex-col gap-2">
                                                    <button
                                                        onClick={() => handleRemove(item)}
                                                        className="cursor-pointer p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                                                        title="Remove"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Continue Shopping Button */}
                    <div className="mt-6 text-center">
                        <Link href="/shop">
                            <button className="cursor-pointer px-5 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-900 transition-colors">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}