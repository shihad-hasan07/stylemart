import React from 'react';

const Related_Products_loading = () => {
    return (
            <div className='mb-10'>
                <div className="h-6 bg-gray-300 rounded w-40 animate-pulse mb-5"></div>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-40 bg-gray-300 rounded-lg animate-pulse"></div>
                            <div className="h-3 bg-gray-300 rounded w-full animate-pulse"></div>
                            <div className="h-3 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>
    );
};

export default Related_Products_loading;

