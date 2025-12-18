import React from 'react';
import { FaStar } from 'react-icons/fa';

const RatingBars = ({ info }) => {
    const { selectedRatings, setSelectedRatings, ratingCounts,reviews } = info;

    const totalReviews = reviews.length;
    const getPercentage = (star) => {
        if (!totalReviews) return 0;
        return (ratingCounts[star] || 0) / totalReviews * 100;
    };
    return (
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
    );
};

export default RatingBars;