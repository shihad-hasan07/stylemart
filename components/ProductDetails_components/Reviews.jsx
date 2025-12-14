import React from 'react';
import Star_Rating from '../shared/_Rating/Star_Rating';
import FormattedDate from '../shared/formatTime/FormattedDate';
import AddReview from '../review/AddReview';

const Reviews = ({ infoFromProducts, infoForReviews }) => {
    const { _id, name, rating } = infoFromProducts
    const { reviews } = infoForReviews
    console.log(reviews);
    return (
        <div className='text-3xl'>
            <h2 className='text-xl font-semibold my-3.5'>{rating?.count} reviews for  {name}</h2>
            <div>
                {/* left secion */}
                <div className='flex items-center gap-3'>
                    <p className='text-5xl lg:text-7xl'>{rating?.average}</p>
                    <div>
                        <Star_Rating rating={rating?.average} big={true}></Star_Rating>
                        <p className='text-sm pl-1 mt-1'>Average of <span className='font-semibold'>{rating?.average} review</span></p>
                    </div>
                </div>

                {/*right secion  */}
                <div>
                </div>
            </div>

            {/* all the reviews */}
            <div className='my-4 py-6 border-y flex flex-col gap-y-6  border-gray-300 divide-y divide-gray-300'>
                {
                    reviews.map((r, idx) => (
                        <div key={idx} className=' flex gap-4 pb-5'>
                            <div className='w-[45px] h-[45px]'>
                                <img src={r?.user?.photoURL} className='w-full h-full rounded-full' alt="" />
                            </div>
                            <div >
                                <Star_Rating rating={r?.rating}></Star_Rating>
                                <p className='text-sm mt-2'>
                                    <span className='text-gray-600 font-semibold'>{r?.user?.name}</span>
                                    <span className='text-gray-500'> — <FormattedDate date={r?.createdAt} /></span>
                                </p>
                                <div className='text-[15px] mt-2.5'> {r?.comment} </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            {/* add review */}
            <div>
                {/* <AddReview></AddReview> */}
            </div>
        </div>
    );
};

export default Reviews;