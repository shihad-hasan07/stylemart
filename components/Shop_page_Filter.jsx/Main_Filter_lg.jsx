import { useEffect, useState } from 'react';

const Main_Filter_lg = ({ props }) => {
    const {
        filters,
        selected_filter_color,
        setSelected_filter_color,
        selected_filter_size,
        setSelected_filter_size,
        minPrice,
        maxPrice,
        priceRange,
        setPriceRange,
        instock_clicked, onsale_clicked,
        setInstock_clicked, setOnsale_clicked
    } = props;



    const [localMin, setLocalMin] = useState(priceRange[0]);
    const [localMax, setLocalMax] = useState(priceRange[1]);

    const toggleColor = (colorName) => {
        setSelected_filter_color(prev => {
            if (prev.includes(colorName)) {
                return prev.filter(c => c !== colorName);
            } else {
                return [...prev, colorName];
            }
        });
    };

    const toggleSize = (size) => {
        setSelected_filter_size(prev => {
            if (prev.includes(size)) {
                return prev.filter(s => s !== size);
            } else {
                return [...prev, size];
            }
        });
    };

    // Price Filter Handlers
    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), localMax - 1);
        setLocalMin(value);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), localMin + 1);
        setLocalMax(value);
    };

    const handleMinInputChange = (e) => {
        const value = e.target.value === '' ? '' : Number(e.target.value);
        setLocalMin(value);
    };

    const handleMaxInputChange = (e) => {
        const value = e.target.value === '' ? '' : Number(e.target.value);
        setLocalMax(value);
    };

    const handleMinInputBlur = () => {
        if (localMin === '' || localMin < minPrice) {
            setLocalMin(minPrice);
        } else if (localMin >= localMax) {
            setLocalMin(localMax - 1);
        }
    };

    const handleMaxInputBlur = () => {
        if (localMax === '' || localMax > maxPrice) {
            setLocalMax(maxPrice);
        } else if (localMax <= localMin) {
            setLocalMax(localMin + 1);
        }
    };

    const handleApplyFilter = () => {
        setPriceRange([localMin, localMax]);
    };

    useEffect(() => {
        setLocalMin(priceRange[0]);
        setLocalMax(priceRange[1]);
    }, [priceRange]);

    // Calculate percentage dynamically based on actual price range
    const priceSpan = maxPrice - minPrice || 1;
    const minPercent = ((Number(localMin) - minPrice) / priceSpan) * 100;
    const maxPercent = ((Number(localMax) - minPrice) / priceSpan) * 100;

    return (
        <div className='hidden xl:flex w-[280px] h-full border-gray-200 pl-2 pr-5'>
            <div className='space-y-6 w-full'>

                {/* ================= COLOR FILTER ================= */}
                <div className='space-y-3'>
                    <h3 className="text-md font-semibold text-gray-700">Filter by Color</h3>
                    {
                        filters?.colors?.length == 0 && (
                            <p className="text-sm text-gray-500">No color filters available.</p>
                        )
                    }

                    {filters?.colors?.map(color => {
                        const isSelected = selected_filter_color.includes(color.color);

                        return (
                            <div
                                key={color.color}
                                onClick={() => toggleColor(color.color)}
                                className="pl-1 flex items-center justify-between gap-5 cursor-pointer hover:opacity-70"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <span
                                            className="w-5 h-5 rounded-full block"
                                            style={{ backgroundColor: color.hex }} />

                                        {isSelected && (
                                            <span className="absolute inset-0 flex items-center justify-center text-white text-[13px] font-bold">
                                                ✔</span>
                                        )}
                                    </div>

                                    <span className="text-sm">{color.color}</span>
                                </div>
                                <span className="text-sm text-gray-600">({color.total})</span>
                            </div>
                        );
                    })}
                </div>

                {/* ================= PRICE FILTER ================= */}
                <div className='space-y-3'>
                    <h3 className="text-md font-semibold text-gray-700">Filter by price</h3>

                    {/* Min and Max Price Inputs */}
                    <div className="flex items-center gap-2">
                        <div className="flex-1">
                            <label className="text-xs text-gray-600 mb-1 block">Min price</label>
                            <input
                                type="number"
                                value={localMin}
                                onChange={handleMinInputChange}
                                onBlur={handleMinInputBlur}
                                className="w-full px-3 py-2 bg-gray-100 border-0 rounded text-sm outline-none"
                                min={minPrice}
                                max={maxPrice}
                            />
                        </div>

                        <span className="text-gray-400 mt-5">-</span>

                        <div className="flex-1">
                            <label className="text-xs text-gray-600 mb-1 block">Max price</label>
                            <input
                                type="number"
                                value={localMax}
                                onChange={handleMaxInputChange}
                                onBlur={handleMaxInputBlur}
                                className="w-full px-3 py-2 bg-gray-100 border-0 rounded text-sm outline-none"
                                min={minPrice}
                                max={maxPrice}
                            />
                        </div>
                    </div>

                    {/* Double Range Slider */}
                    <div className="relative pt-2">
                        <div className="relative h-1 bg-gray-200 rounded">
                            <div
                                className="absolute h-full bg-black rounded"
                                style={{
                                    left: `${Math.max(0, Math.min(100, minPercent))}%`,
                                    right: `${Math.max(0, Math.min(100, 100 - maxPercent))}%`
                                }}
                            />
                        </div>

                        <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={Math.max(minPrice, Math.min(maxPrice, Number(localMin) || minPrice))}
                            onChange={handleMinChange}
                            className="absolute w-full h-1 top-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                            style={{ zIndex: localMin > (minPrice + maxPrice) / 2 ? 5 : 3 }}
                        />

                        <input
                            type="range"
                            min={minPrice}
                            max={maxPrice}
                            value={Math.max(minPrice, Math.min(maxPrice, Number(localMax) || maxPrice))}
                            onChange={handleMaxChange}
                            className="absolute w-full h-1 top-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                            style={{ zIndex: localMax <= (minPrice + maxPrice) / 2 ? 5 : 3 }}
                        />
                    </div>

                    {/* Price Display and Filter Button */}
                    <div className="flex items-center justify-between pt-2">
                        <p className="text-sm text-gray-700">
                            Price: <span className="font-medium">${localMin}</span> — <span className="font-medium">${localMax}</span>
                        </p>

                        <button
                            onClick={handleApplyFilter}
                            className="cursor-pointer px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-sm font-medium rounded transition-colors"
                        >
                            FILTER
                        </button>
                    </div>
                </div>


                {/* ================= SIZE FILTER ================= */}
                <div className='space-y-3'>
                    <h3 className="text-md font-semibold text-gray-700">Filter by Size</h3>
                    {
                        filters?.sizes?.length == 0 && (
                            <p className="text-sm text-gray-500">No size filters available.</p>
                        )
                    }

                    {filters?.sizes?.map((size, idx) => {
                        const isSelected = selected_filter_size.includes(size.size);

                        return (
                            <div
                                key={idx}
                                onClick={() => toggleSize(size.size)}
                                className="pl-1 flex items-center justify-between gap-5 cursor-pointer hover:opacity-70"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="relative w-4 h-4 rounded-sm bg-gray-200 flex items-center justify-center">
                                        {isSelected && (
                                            <button className="text-white bg-red-600 w-4 h-4 rounded-sm justify-center items-center text-[12px] font-bold">✔</button>
                                        )}
                                    </div>

                                    <span className="text-sm">{size.size}</span>
                                </div>
                                <span className="text-sm">({size.total})</span>
                            </div>
                        );
                    })}
                </div>

                {/* products status */}
                <div className='space-y-3'>
                    <h3 className="text-md font-semibold text-gray-700">Products status</h3>

                    {/* in stock button  */}
                    <div onClick={() => setInstock_clicked(!instock_clicked)} className="cursor-pointer flex items-center gap-3">
                        <div className="relative w-4 h-4 rounded-sm bg-gray-200 flex items-center justify-center">
                            {instock_clicked && (
                                <button className="text-white bg-red-600 w-4 h-4 rounded-sm justify-center items-center text-[12px] font-bold">✔</button>
                            )}
                        </div>
                        <span className="text-sm">In Stock</span>
                    </div>

                    {/* on sale button  */}
                    <div onClick={() => setOnsale_clicked(!onsale_clicked)} className="cursor-pointer flex items-center gap-3">
                        <div className="relative w-4 h-4 rounded-sm bg-gray-200 flex items-center justify-center">
                            {onsale_clicked && (
                                <button className="text-white bg-red-600 w-4 h-4 rounded-sm justify-center items-center text-[12px] font-bold">✔</button>
                            )}
                        </div>
                        <span className="text-sm">On Sale</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main_Filter_lg;