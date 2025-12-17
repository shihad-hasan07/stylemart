'use client'
import { useEffect, useState } from 'react';
import Reviews from './Reviews';
import useAxios from '@/hooks/useAxios';
import { useSearchParams } from 'next/navigation';


const Descrip_info_reviews = ({ Info }) => {
    const params = useSearchParams();
    const isActiveParam = params.get('active');

    const { _id, slug, name, description, variations, rating, refetch } = Info;
    // which button will be acitive
    const [isActive, setIsActive] = useState(isActiveParam || "description")
    const buttons = [
        { name: 'Description', value: 'description' },
        { name: 'Additional Info', value: 'additionalInfo' },
        { name: `Reviews (${rating?.count || 0})`, value: 'reviews' }
    ]
    const [reviews, setReviews] = useState([])
    const axiosPublic = useAxios()

    const [isReivewUpdated, setIsReivewUpdated] = useState(0)
    useEffect(() => {
        axiosPublic.get(`/reviews/${_id}`)
            .then(data => setReviews(data?.data?.data?.reviews))
    }, [_id, isReivewUpdated])

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

                {/* description */}
                {
                    isActive === 'description' &&
                    <div>
                        {description}
                    </div>
                }

                {/* additional info */}
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

                {/* review */}
                {
                    isActive === 'reviews' && <Reviews
                        infoFromProducts={{ _id, slug, name, rating }}
                        infoForReviews={{ reviews, setIsReivewUpdated, refetch }} />

                }
            </div >
        </>
    );
};

export default Descrip_info_reviews;