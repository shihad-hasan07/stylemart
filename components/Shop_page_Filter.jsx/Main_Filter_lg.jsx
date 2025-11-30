import React from 'react';


const Main_Filter_lg = ({ props }) => {
    const { filters, selected_filter_color, setSelected_filter_color, selected_filter_size, setSelected_filter_size } = props;

    const toggleColor = (colorName) => {
        setSelected_filter_color(prev => {
            if (prev.includes(colorName)) {
                return prev.filter(c => c !== colorName);
            } else {
                return [...prev, colorName];
            }
        });
    };

    // Toggle multi-select size
    const toggleSize = (size) => {
        setSelected_filter_size(prev => {
            if (prev.includes(size)) {
                return prev.filter(s => s !== size);
            } else {
                return [...prev, size];
            }
        });
    };

    return (
        <div className='hidden  xl:flex w-[280px] h-full border-gray-200 pl-2 pr-5'>
            <div className='space-y-6 w-full'>

                {/* ================= COLOR FILTER ================= */}
                <div className='space-y-3'>
                    <h3 className="text-md font-semibold text-gray-700">Filter by Color</h3>

                    {filters?.colors?.map(color => {
                        const isSelected = selected_filter_color.includes(color.color);

                        return (
                            <div
                                key={color.color}
                                onClick={() => toggleColor(color.color)}
                                className="pl-1 flex items-center justify-between gap-5 cursor-pointer hover:opacity-70"
                            >
                                <div className="flex items-center gap-3">

                                    {/* Color Circle */}
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

                {/* ================= SIZE FILTER ================= */}
                <div className='space-y-3'>
                    <h3 className="text-md font-semibold text-gray-700">Filter by Size</h3>

                    {filters?.sizes?.map((size, idx) => {
                        const isSelected = selected_filter_size.includes(size.size);

                        return (
                            <div
                                key={idx}
                                onClick={() => toggleSize(size.size)}
                                className="pl-1 flex items-center justify-between gap-5 cursor-pointer hover:opacity-70"
                            >
                                <div className="flex items-center gap-3">

                                    {/* size check circle */}
                                    <div className="relative w-5 h-5 rounded-full  bg-gray-300 flex items-center justify-center">
                                        {isSelected && (
                                            <span className="text-black text-[13px] font-bold">✔</span>
                                        )}
                                    </div>

                                    <span className="text-sm">{size.size}</span>
                                </div>
                                <span className="text-sm">({size.total})</span>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default Main_Filter_lg;
