import React from 'react';

const FilterOptions = ({ setFilterStatus, filterStatus, loading }) => {
    return (
        <div className={`px-8 py-4 bg-gray-50 border-b border-gray-400 ${loading && "pointer-events-none"}`} >
            <div className="flex flex-wrap gap-2">
                <button onClick={() => setFilterStatus('')}
                    className={`px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${filterStatus === ''
                        ? 'bg-[#073f74] text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    All Orders
                </button>
                <button
                    onClick={() => setFilterStatus('pending')}
                    className={`px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${filterStatus === 'pending'
                        ? 'bg-[#073f74] text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    Pending
                </button>
                <button
                    onClick={() => setFilterStatus('shipped')}
                    className={`px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${filterStatus === 'shipped'
                        ? 'bg-[#073f74] text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    Shipped
                </button>
                <button
                    onClick={() => setFilterStatus('delivered')}
                    className={`px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${filterStatus === 'delivered'
                        ? 'bg-[#073f74] text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    Delivered
                </button>
            </div>
        </div>
    );
};

export default FilterOptions;