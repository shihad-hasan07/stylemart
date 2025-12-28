const ProductFormSkeleton = () => {
    return (
        <div className="px-6 m-5 bg-white rounded-xl py-5 mt-3 animate-pulse">
            {/* Basic Information Section */}
            <div className="h-6 bg-gray-200 rounded w-48 mb-3"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name & Brand */}
                <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-10 bg-gray-100 rounded"></div>
                </div>
                <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-10 bg-gray-100 rounded"></div>
                </div>

                {/* SKU & Slug */}
                <div>
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                    <div className="h-10 bg-gray-100 rounded"></div>
                </div>
                <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-10 bg-gray-100 rounded"></div>
                </div>

                {/* Short Description */}
                <div className="md:col-span-2">
                    <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>
                    <div className="h-16 bg-gray-100 rounded"></div>
                </div>

                {/* Full Description */}
                <div className="md:col-span-2">
                    <div className="h-4 bg-gray-200 rounded w-36 mb-2"></div>
                    <div className="h-32 bg-gray-100 rounded"></div>
                </div>
            </div>

            <hr className="mt-6 mb-5 border-gray-200" />

            {/* Pricing & Stock Section */}
            <div className="h-6 bg-gray-200 rounded w-40 mb-3"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-10 bg-gray-100 rounded"></div>
                </div>
                <div>
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-10 bg-gray-100 rounded"></div>
                </div>
                <div>
                    <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
                    <div className="h-10 bg-gray-100 rounded"></div>
                </div>
            </div>

            <hr className="mt-6 mb-5 border-gray-200" />

            {/* Sale Settings */}
            <div className="flex justify-between mb-5">
                <div>
                    <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-64"></div>
                </div>
                <div className="h-6 w-11 bg-gray-200 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
                    <div className="h-10 bg-gray-100 rounded"></div>
                </div>
                <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-10 bg-gray-100 rounded"></div>
                </div>
            </div>

            <hr className="mt-6 mb-5 border-gray-200" />

            {/* Categories */}
            <div>
                <div className="h-4 bg-gray-200 rounded w-28 mb-3"></div>
                <div className="flex flex-wrap gap-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-10 w-24 bg-gray-100 rounded"></div>
                    ))}
                </div>
            </div>

            {/* Tags */}
            <div className="mt-6">
                <div className="h-4 bg-gray-200 rounded w-36 mb-2"></div>
                <div className="h-10 bg-gray-100 rounded"></div>
            </div>

            <hr className="mt-6 mb-5 border-gray-200" />

            {/* Images */}
            <div>
                <div className="h-4 bg-gray-200 rounded w-48 mb-3"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-40 sm:h-50 xl:h-60 bg-gray-100 rounded-lg"></div>
                    ))}
                </div>
            </div>

            <hr className="mt-6 mb-5 border-gray-200" />

            {/* Variations */}
            <div>
                <div className="h-6 bg-gray-200 rounded w-44 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-72 mb-4"></div>
                <div className="h-12 bg-gray-100 rounded mb-4"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[1, 2].map((i) => (
                        <div key={i} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                            <div className="flex items-center justify-between p-5 bg-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                                    <div>
                                        <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
                                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 space-y-3">
                                <div className="flex gap-2">
                                    <div className="h-8 w-20 bg-gray-100 rounded-lg"></div>
                                    <div className="h-8 w-16 bg-gray-100 rounded-lg"></div>
                                </div>
                                <div className="h-11 bg-gray-100 rounded-lg"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-end mt-6">
                <div className="h-11 w-full sm:w-32 bg-gray-100 rounded-lg"></div>
                <div className="h-11 w-full sm:w-40 bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    );
};

export default ProductFormSkeleton;