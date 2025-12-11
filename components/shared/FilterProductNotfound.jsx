
const FilterProductNotfound = ({clearAllFilters}) => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-20 text-center">
            {/* Icon Box */}
            <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-xl mb-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 7h18M3 7l2 12h14l2-12M3 7l3-4h12l3 4M9 11h6m-6 4h6"
                    />
                </svg>
            </div>

            {/* Heading */}
            <h2 className="text-xl font-semibold text-gray-800">
                No products found!
            </h2>

            {/* Description */}
            <p className="text-gray-500 mt-2">
                No products were found matching your selection.
            </p>
            <button onClick={clearAllFilters} className="cursor-pointer mt-3.5 px-4 py-1.5 bg-gray-200 rounded-sm">Clear all filter</button>
        </div>
    );
};

export default FilterProductNotfound;