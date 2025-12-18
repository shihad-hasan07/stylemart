import { FaRegCommentDots } from 'react-icons/fa';

const NoRatings = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl  border-gray-300  p-10 ">
            <FaRegCommentDots className="text-5xl text-gray-400" />

            <h3 className="text-lg font-semibold text-gray-700">
                No reviews yet
            </h3>

            <p className="text-sm text-gray-500">
                Be the first to share your experience.
            </p>
        </div>
    );
};

export default NoRatings;