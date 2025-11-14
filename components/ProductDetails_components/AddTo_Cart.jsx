import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

const AddTo_Cart = ({ selectedColor, selectedSize }) => {
    const handle_addtoCart = () => {
        if (!(selectedColor || selectedSize)) {
            return alert('First select')
        }
    }
    return (
        <div className="mt-7 flex gap-3">
            <div className="rounded-xs border-gray-300 border w-fit px-3 py-2.5 flex items-center gap-6">
                <FiMinus size={24} className="cursor-pointer active:scale-80 hover:text-red-700 transition duration-300" />
                <p>1</p>
                <FiPlus size={22} className="cursor-pointer active:scale-90 hover:text-red-700 transition duration-200 " />
            </div>
            <button onClick={handle_addtoCart} className="rounded-xs cursor-pointer px-7 py-2.5 text-white bg-[#2f9e44] active:scale-95 hover:bg-[#29843b] transition duration-100">Add to cart</button>
        </div>
    );
};

export default AddTo_Cart;