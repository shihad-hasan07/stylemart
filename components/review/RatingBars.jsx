import React from 'react';

const RatingBars = ({ info }) => {
    const { setSelectedRating, getPercentage } = info;
    return (
        <div>
            <div className="space-y-2 mt-4">
                {[5, 4, 3, 2, 1].map(star => (
                    <div
                        key={star}
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => setSelectedRating(star)} // filter hook
                    >
                        {/* star label */}
                        <span className="flex items-center gap-1 w-10 text-sm">
                            ⭐ {star}
                        </span>

                        {/* bar background */}
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            {/* filled bar */}
                            <div
                                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                                style={{ width: `${getPercentage(star)}%` }}
                            />
                        </div>

                        {/* count */}
                        <span className="w-6 text-sm text-gray-600">
                            {ratingCount[star] || 0}
                        </span>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default RatingBars;