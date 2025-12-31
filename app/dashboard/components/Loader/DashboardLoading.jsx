import React from 'react';
import Routes_heading_texts from '../shared/Routes_heading_texts';

const DashboardLoading = () => {
    return (
        <div>
            <Routes_heading_texts name={'dashboard'} />
            <div className="p-4 sm:p-6 space-y-6">
                {/* Stats Cards Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                                <div className="h-5 w-16 bg-gray-200 rounded"></div>
                            </div>
                            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                            <div className="h-8 bg-gray-200 rounded w-32"></div>
                        </div>
                    ))}
                </div>

                {/* Alerts Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                        <div className="h-12 bg-gray-200 rounded w-16 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-40"></div>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                        <div className="h-12 bg-gray-200 rounded w-16 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-40"></div>
                    </div>
                </div>

                {/* Recent Orders Skeleton */}
                <div className="bg-white rounded-xl shadow-sm animate-pulse">
                    <div className="p-6">
                        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-16 bg-gray-100 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLoading;