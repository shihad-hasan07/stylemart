''
import { useState } from 'react';

const buttons = [
    { name: 'Description', value: 'description' },
    { name: 'Additional Info', value: 'additionalInfo' },
    { name: 'Reviews', value: 'reviews' }
]

const Descrip_info_reviews = ({ Info }) => {
    const { _id, description, variations, colorVariation } = Info;
    const [isActive, setIsActive] = useState("description")

    return (
        <>
            <div className="space-x-3.5 -mt-2 text-[16px] font-medium tracking-wide- text-gray-400">
                {
                    buttons.map((b, idx) => <button key={idx} onClick={() => setIsActive(b.value)}
                        className={`${isActive === b.value && 'text-black font-semibold'} cursor-pointer transition duration-300`}>
                        {b.name}
                    </button>)
                }
            </div>
            <hr className='opacity-15 mt-1.5 mb-2.5' />
            <div className='pt-0.5'>
                {
                    isActive === 'description' &&
                    <div>
                        {description}
                    </div>
                }
                {
                    isActive === 'additionalInfo' &&
                    <div>
                        <h2 className='text-[22px] font-semibold'>Additional information</h2>
                        <div>

                            {
                                variations?.length > 0 && <div className='mt-3 border text-[15px] border-gray-200 divide-y divide-gray-300'>
                                    {
                                        variations.map((e, idx) => {
                                            if (!e.options || e.options.length === 0) return null; // <- empty হলে skip

                                            return (
                                                <div key={idx}>
                                                    <div className={`flex ${idx === 0 && 'bg-[#e8eae9]'}`}>
                                                        <p className='pl-6 py-2.5 w-[100px]'>{e.attribute}</p>
                                                        <p className='border opacity-5 mr-4'></p>
                                                        <p className='py-2.5'>
                                                            {e.options.map((d, idx) => (idx === 0 ? d : `, ${d}`))}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
                }
                {
                    isActive === 'reviews' &&
                    <div className='text-3xl'>
                        Review section is under Development...
                    </div>
                }
            </div >
        </>
    );
};

export default Descrip_info_reviews;