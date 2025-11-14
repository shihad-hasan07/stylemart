import React from 'react';
import ColorName_Hex from "../shared/ColorName_Hex";
import { RxCross2 } from "react-icons/rx";

const Select_by_variations = ({ Allinfo }) => {
    const { selectedColor, selectedSize, setSelectedColor, setSelectedSize, availableColors, availableSizes } = Allinfo;
    return (
        <div>
            {/* select by color */}
            {availableColors.length > 0 && (
                <div className="flex gap-3.5 items-center mt-4">
                    <label className="font-semibold text-gray-800">
                        Color: <span className="text-sm font-semibold text-gray-700 transition ease-in-out duration-700">{selectedColor}</span>
                    </label>
                    <div className="flex gap-0.5 flex-wrap">
                        {availableColors.map((color, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedColor(color)}
                                className={`cursor-pointer flex p-0.5 border-2 rounded-full transition-transform duration-200 ease-in-out active:scale-90 ${selectedColor === color
                                    ? ' border-gray-400 '
                                    : 'border-white'
                                    }`}
                            >
                                <span className="rounded-full w-5 h-5 transition-all duration-200" style={{ backgroundColor: ColorName_Hex(color.replace(/\s+/g, "")) }}>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {(availableColors && availableSizes) && <hr className="my-3 opacity-15" />}

            {/* select by size */}
            {availableSizes.length > 0 && (
                <div className="flex gap-3.5 items-center mt-4">
                    <label className="font-semibold text-gray-800">
                        Size: <span className="text-sm font-semibold text-gray-700">{selectedSize}</span>
                    </label>
                    <div className="flex gap-2.5 flex-wrap">
                        {availableSizes.map((size, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedSize(size)}
                                className={`cursor-pointer text-sm flex px-3 border rounded-xs transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${selectedSize === size
                                    ? ' border-[#ee403d] bg-[#ee403d] text-white scale-105'
                                    : 'border-gray-300'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    {(selectedColor || selectedSize) &&
                        <div className="flex gap-0.5 items-center cursor-pointer transition-all duration-300 ease-in-out hover:text-red-500 group"
                            onClick={() => {
                                setSelectedColor('')
                                setSelectedSize('')
                            }}>
                            <RxCross2 className="text-sm opacity-70 transition-transform duration-200 group-hover:rotate-90" />
                            <p>Clear</p>
                        </div>
                    }
                </div>
            )}
        </div>
    );
};

export default Select_by_variations;