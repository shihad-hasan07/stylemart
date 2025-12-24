import React from 'react';

const Products_page_loading = () => {
    return (
         <div className="bg-white rounded-xl mx-5 md:my-5 overflow-hidden">
            {/* Header Skeleton */}
            <div className=" hidden md:grid md:grid-cols-[2fr_1.2fr_1fr_0.8fr_1fr_0.6fr] lg:grid-cols-[1.7fr_0.8fr_0.9fr_0.9fr_0.8fr_0.6fr] gap-4 px-6 py-4 border-b border-gray-200">
                <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
            </div>
            {/* Products Skeleton */}
            <div className="divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="md:grid md:grid-cols-[2fr_1.2fr_1fr_0.8fr_1fr_0.6fr] lg:grid-cols-[1.7fr_0.8fr_0.9fr_0.9fr_0.8fr_0.6fr] gap-4 px-4 md:px-6 py-4">
                        {/* Mobile */}
                        <div className="md:hidden">
                            <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-gray-200">
                                <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse shrink-0"></div>
                                <div className="flex-1 min-w-0 space-y-2">
                                    <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                    <div className="flex gap-1.5 mb-2">
                                        <div className="h-5 w-12 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                                </div>
                                <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>

                        {/* Desktop */}
                        <div className="hidden md:flex items-center gap-3">
                            <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse shrink-0"></div>
                            <div className="h-3 bg-gray-200 rounded flex-1 animate-pulse"></div>
                        </div>
                        <div className="hidden md:flex md:items-center md:justify-center gap-1.5">
                            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="hidden md:flex items-center justify-center">
                            <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                        </div>
                        <div className="hidden md:flex items-center justify-center">
                            <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                        </div>
                        <div className="hidden lg:flex items-center justify-center">
                            <div className="h-6 bg-gray-200 rounded-md w-20 animate-pulse"></div>
                        </div>
                        <div className="hidden md:flex items-center justify-center gap-2">
                            <div className="w-9 h-9 bg-gray-200 rounded-lg animate-pulse"></div>
                            <div className="w-9 h-9 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products_page_loading;