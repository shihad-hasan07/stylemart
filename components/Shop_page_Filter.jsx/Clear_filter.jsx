import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { FiMinus } from "react-icons/fi";

const Clear_filter = ({ props }) => {
    const { selected_filter_color, setSelected_filter_color, selected_filter_size, setSelected_filter_size } = props

    const clearColorFilter = (color) => {
        const removedCurrentColor = selected_filter_color.filter(c => c !== color)
        setSelected_filter_color(removedCurrentColor)
    }
    const clearSizeFilter = (size) => {
        const removedCurrentSize = selected_filter_size.filter(s => s !== size)
        setSelected_filter_size(removedCurrentSize)
    }
    return (
        <div className='flex gap-2 font-medium text-sm flex-wrap pl-0 xl:pl-6 mb-4'>
            {
                <p onClick={() => { setSelected_filter_color([]); setSelected_filter_size([]) }} className="cursor-pointer flex items-center gap-0.5 group relative">

                    <RxCross2 size={18} className="absolute opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-50 transition-all duration-200" />

                    <FiMinus size={17} className="absolute opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200" />

                    <span className="pl-5">Clear filter</span>
                </p>
            }
            {
                selected_filter_color?.map(color =>
                    <p onClick={() => clearColorFilter(color)} key={color} className="cursor-pointer group flex items-center gap-1 relative">
                        <RxCross2 size={17} className="absolute opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-50 transition-all duration-200" />

                        <FiMinus size={17} className="absolute opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200" />

                        <span className='pl-5'>{color}</span>
                    </p>

                )
            }
            {
                selected_filter_size?.map(size =>
                    <p onClick={() => clearSizeFilter(size)} key={size} className="cursor-pointer group flex items-center gap-1 relative">
                        <RxCross2 size={17} className="absolute opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-50 transition-all duration-200" />

                        <FiMinus size={17} className="absolute opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200" />

                        <span className='pl-5'>{size}</span>
                    </p>
                )
            }

        </div>
    );
};

export default Clear_filter;