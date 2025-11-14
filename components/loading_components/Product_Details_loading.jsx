import React from 'react';

export default function ProductLoadingPage() {
    return (
        <div className="flex flex-col md:grid md:grid-cols-2 gap-10 mt-6 mb-12">
            {/* Main Image Section - Left Side */}
            <div className="space-y-4">
                {/* Sale Badge */}
                <div className="relative">
                    <div className="absolute top-4 left-4 z-10 w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
                    {/* Main Image */}
                    <div className="w-full h-80 md:h-96 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-16 md:h-20 bg-gray-300 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            </div>

            {/* Text Part - Right Side */}
            <div>
                {/* Product Name */}
                <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse mb-3"></div>

                {/* Star Rating & Reviews */}
                <div className="flex gap-2 mt-2.5 mb-3 items-center">
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                        ))}
                    </div>
                    <div className="h-3 bg-gray-300 rounded w-20 animate-pulse"></div>
                </div>

                <hr className="opacity-10" />

                {/* Price Section */}
                <div className="text-left mt-4">
                    <div className="flex items-end gap-2">
                        <div className="h-5 bg-gray-300 rounded w-20 animate-pulse"></div>
                        <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
                    </div>
                </div>

                {/* Sort Description */}
                <div className="mt-4 space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-gray-300 rounded w-5/6 animate-pulse"></div>
                </div>

                {/* Select by Variations - Color & Size */}
                <div className="mt-5 space-y-4">
                    {/* Color Selection */}
                    <div>
                        <div className="h-4 bg-gray-300 rounded w-20 animate-pulse mb-2"></div>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-9 h-9 bg-gray-300 rounded-full animate-pulse"></div>
                            ))}
                        </div>
                    </div>

                    {/* Size Selection */}
                    <div>
                        <div className="h-4 bg-gray-300 rounded w-16 animate-pulse mb-2"></div>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-11 h-9 bg-gray-300 rounded animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stock Status */}
                <div className="bg-gray-300 mt-5 w-20 h-6 rounded-sm animate-pulse"></div>

                {/* Add to Cart */}
                <div className="mt-5 flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded">
                        <div className="w-10 h-11 bg-gray-300 animate-pulse"></div>
                        <div className="w-12 h-11 bg-gray-300 animate-pulse"></div>
                        <div className="w-10 h-11 bg-gray-300 animate-pulse"></div>
                    </div>
                    <div className="h-11 bg-gray-300 rounded flex-1 animate-pulse"></div>
                </div>

                {/* Add to Wishlist */}
                {/* <div className="mt-4 h-11 bg-gray-300 rounded w-full animate-pulse"></div> */}

                <hr className="opacity-10 my-5" />


                {/* SKU & Categories */}
                <div className="mt-5 space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-44 animate-pulse"></div>
                    <div className="h-3 bg-gray-300 rounded w-48 animate-pulse"></div>
                    <div className="h-3 bg-gray-300 rounded w-36 animate-pulse"></div>
                </div>

                {/* Social Profile */}
                <div className="flex items-center gap-3 mt-5">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                    ))}
                </div>
            </div>

            {/* Description - Additional Info - Reviews */}
            <div className="md:col-span-2">
                <hr className="opacity-10" />
                <div className="pt-6">
                    {/* Tabs */}
                    <div className="flex gap-6 mb-5 pb-3">
                        <div className="h-5 bg-gray-300 rounded w-28 animate-pulse"></div>
                        <div className="h-5 bg-gray-300 rounded w-32 animate-pulse"></div>
                        <div className="h-5 bg-gray-300 rounded w-20 animate-pulse"></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-3 bg-gray-300 rounded w-full animate-pulse"></div>
                        ))}
                        <div className="h-3 bg-gray-300 rounded w-4/5 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}