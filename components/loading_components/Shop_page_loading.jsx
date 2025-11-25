import React from 'react';

const Shop_page_loading = () => {
    return (
        <div className='pb-10  overflow-hidden animate-pulse  gap-10'>
            <div className="">
                <div className='relative h-[280px] sm:h-[320px] md:h-[340px] lg:h-[360px] xl:h-[380px] bg-gray-200 rounded-xs'>
                    <div className='absolute right-3 top-3 bg-gray-300 w-[30px] h-[30px] rounded-full'></div>
                </div>

                <div className='flex gap-2 mt-3 items-center'>
                    <div className='flex gap-1'>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className='w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded'></div>
                        ))}
                    </div>
                    <div className='w-6 h-2 sm:w-8 sm:h-3 bg-gray-200 rounded'></div>
                </div>

                <div className='my-2'>
                    <div className='h-3 sm:h-4 bg-gray-200 rounded w-3/4 mb-1.5 sm:mb-2'></div>
                    <div className='h-3 sm:h-4 bg-gray-200 rounded w-1/2'></div>
                </div>
                <div className='flex items-end gap-2'>
                    <div className='h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16'></div>
                    <div className='h-4 sm:h-5 bg-gray-200 rounded w-16 sm:w-20'></div>
                </div>
            </div>
        </div>
    )
};

export default Shop_page_loading;