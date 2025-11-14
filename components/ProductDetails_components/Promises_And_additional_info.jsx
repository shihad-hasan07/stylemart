import React from 'react';
import { FiCheck } from 'react-icons/fi';

const Promises_And_additional_info = ({ sku, categories, tags }) => {
    return (
        <>
            <div className="text-sm tracking-wide space-y-1.5">
                <div className="flex items-center gap-1.5"><div><FiCheck />  </div><p><span className="font-bold">Delivered today</span>(order Mon-Fri before 12:00, delivery between 17:00 and 22:00)</p></div>
                <p className="flex items-center gap-1.5"><FiCheck /><span className="font-bold">Including</span> shipping costs, sent by StyleMart</p>
                <p className="flex items-center gap-1.5"><FiCheck />Pick up at a StyleMart collection point is possible</p>
                <p className="flex items-center gap-1.5"><FiCheck />30 days to change your mind and free returns</p>
                <p className="flex items-center gap-1.5"><FiCheck />Day and night customer service</p>
            </div>
            <hr className="opacity-15 my-6" />
            <div className="text-sm space-y-2.5 font-light text-gray-700">
                <p>SKU: <span className="font-semibold">{sku || 'None'}</span></p>
                <p>Categories: <span className="font-semibold">{categories ? categories.map((c, idx) => idx === 0 ? c : `, ${c}`) : 'None'}</span></p>
                <p>Tags: <span className="font-semibold">{tags ? tags.map((t, idx) => idx === 0 ? t : `, ${t}`) : 'None'}</span></p>
            </div>
        </>
    );
};

export default Promises_And_additional_info;