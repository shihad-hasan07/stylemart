import React, { useContext, useState } from 'react';
import Star_Rating from '../shared/_Rating/Star_Rating';
import FormattedDate from '../shared/formatTime/FormattedDate';
import AddReview from '../review/AddReview';
import { FaRegCommentDots, FaStar } from 'react-icons/fa';
import { allContext } from '@/Auth/Authprovider';

const Reviews = ({ infoFromProducts, infoForReviews }) => {
    const { userfromDB } = useContext(allContext)
    const { _id, slug, name, rating } = infoFromProducts;
    const { reviews = [], setIsReivewUpdated, refetch } = infoForReviews;

    const [selectedRatings, setSelectedRatings] = useState(null)

    const myReview = reviews?.find(review => review?.user?._id == userfromDB?._id)
    const otherReviews = reviews?.filter(review => review?.user?._id !== userfromDB?._id)

    const ratingCounts = reviews.reduce((acc, r) => {
        acc[r.rating] = (acc[r.rating] || 0) + 1;
        return acc;
    }, {});
    const totalReviews = reviews.length;
    const getPercentage = (star) => {
        if (!totalReviews) return 0;
        return (ratingCounts[star] || 0) / totalReviews * 100;
    };
    const allReviews = selectedRatings ? reviews?.filter(r => r.rating == selectedRatings) : otherReviews

    console.log(allReviews);

    return (
        <>
            <div>
                {
                    !rating?.count == 0
                        ? <div className='text-3xl'>
                            <h2 className='text-xl font-semibold my-3.5'>{rating?.count} reviews for  {name}</h2>
                            <div className='flex flex-col md:flex-row md:items-center gap-5 lg:gap-10'>
                                {/* left secion */}
                                <div className='flex items-center gap-3'>
                                    <p className='text-5xl lg:text-7xl'>{rating?.average}</p>
                                    <div>
                                        <Star_Rating rating={rating?.average} big={true}></Star_Rating>
                                        <p className='text-sm lg:text-base pl-1 mt-1'>Average of <span className='font-semibold'>{rating?.average} review</span></p>
                                    </div>
                                </div>

                                {/*right secion  */}
                                <div className='space-y-1 w-full md:w-[490px]'>
                                    {
                                        [5, 4, 3, 2, 1].map(star => (
                                            <div key={star} className={`flex items-center cursor-pointer px-2 py-1 
                                                ${selectedRatings === star ? 'font-semibold rounded-3xl  bg-gray-100 text-yellow-800' : ''}`}
                                                onClick={() => setSelectedRatings(star)}
                                            >
                                                {/* star label */}
                                                <span className="flex items-center gap-1.5 w-10 text-sm">
                                                    <FaStar fill='#fcc419' size={12} />  {star}
                                                </span>

                                                {/* bar background */}
                                                <div className={`flex-1 h-[5px] lg:h-[6px] ${selectedRatings == star ? 'bg-white' : 'bg-gray-200'}  rounded-full overflow-hidden`}>
                                                    {/* filled bar */}
                                                    <div
                                                        className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                                                        style={{ width: `${getPercentage(star)}%` }}
                                                    />
                                                </div>

                                                {/* count */}
                                                <span className=" ml-3 text-sm text-gray-600">
                                                    {ratingCounts[star] || 0}
                                                </span>
                                            </div>
                                        ))
                                    }
                                    <p className={`pl-2 underline cursor-pointer  text-sm ${selectedRatings ? '' : 'hidden'}`}
                                        onClick={() => setSelectedRatings(null)}>Show all reviews</p>
                                </div>
                            </div>

                            {/* all the reviews */}
                            <div className={`my-4 flex flex-col border-y border-gray-200 divide-y divide-gray-200`}>
                                {/* my review on top ==> jdi my reviw thake tobei dekhabe */}
                                {
                                    !selectedRatings && myReview &&
                                    <div className=' flex gap-4 px-3 pt-6 pb-5 bg-gray-100'>
                                        <div className='w-[45px] h-[45px]'>
                                            <img src={myReview?.user?.photoURL} className='w-full h-full rounded-full' alt="" />
                                        </div>
                                        <div >
                                            <Star_Rating rating={myReview?.rating}></Star_Rating>
                                            <p className='text-sm mt-2'>
                                                <span className='text-gray-600 font-semibold'>
                                                    {myReview?.user?.name}
                                                    <span className="ml-2 text-xs text-blue-600">(You)</span>
                                                </span>
                                                <span className='text-gray-500'> — <FormattedDate date={myReview?.createdAt} /></span>
                                            </p>
                                            <div className='text-[15px] mt-2.5'> {myReview?.comment} </div>
                                        </div>
                                    </div>
                                }

                                {/*  other reviws */}
                                {
                                    allReviews.length > 0
                                        ?
                                        allReviews.map((r, idx) => (
                                            <div key={idx} className=' flex gap-4 px-3 pt-6 pb-5'>
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
                                        : selectedRatings && (
                                            // <div className="py-6 px-3 text-sm text-gray-500  border-gray-200">
                                            <div className='py-6 px-3  text-base '>
                                                No {selectedRatings} — star reviews at the moment.
                                            </div>
                                        )

                                }
                            </div>
                        </div>
                        :
                        <div className="flex flex-col items-center justify-center gap-3 rounded-xl  border-gray-300  p-10 ">
                            <FaRegCommentDots className="text-5xl text-gray-400" />

                            <h3 className="text-lg font-semibold text-gray-700">
                                No reviews yet
                            </h3>

                            <p className="text-sm text-gray-500">
                                Be the first to share your experience.
                            </p>
                        </div>
                }
            </div>

            {/*  add reviews and update review option */}
            <div>
                {
                    <AddReview info={{ _id, slug, setIsReivewUpdated, refetch }} ></AddReview>
                }
            </div >

        </>
    );
};

export default Reviews;