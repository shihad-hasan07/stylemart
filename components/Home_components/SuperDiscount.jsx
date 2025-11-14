import React from 'react';

const SuperDiscount = () => {
    return (
        <div className='bg-[#ffebeb] py-5 text-[#e42148] flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-4 text-center'>
            <p className='text-xl font-semibold'>Super discount for your first purchase</p>
            <p className='px-2 py-1.5 border font-semibold border-red-500 border-dashed '>STYLE25MART</p>
            <p>Use discount code in the checkout!</p>
        </div>
    );
};

export default SuperDiscount;