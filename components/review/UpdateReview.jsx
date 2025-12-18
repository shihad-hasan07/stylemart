'use client'
import { allContext } from "@/Auth/Authprovider";
import useAxios from "@/hooks/useAxios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { toast } from "react-toastify";

const UpdateReveiw = ({ info }) => {
    const { _id, slug, setIsReivewUpdated, refetch, myReview, setIsOpen, isOpen } = info
    const { user, userfromDB } = useContext(allContext)
    const axiosPublic = useAxios()

    const router = useRouter()
    const [values, setValues] = useState({
        rating: myReview?.rating,
        review: myReview?.comment
    })
    const ratingChanges = (rating) => {
        setValues(prev => (
            {
                ...prev,
                rating: rating
            }
        ))
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        if (values.rating == 0) {
            return alert('Please select a rating first')
        }
        if (!user) {
            return router.push(`/login?from=/shop/${_id}/${slug}?active=reviews`);
        }
        const finalReviewsInfo = {
            userId: userfromDB?._id,
            rating: values?.rating,
            comment: values?.review
        }

        console.log('hi ', myReview?._id, finalReviewsInfo);

        axiosPublic.patch(`/reviews/${myReview?._id}`, finalReviewsInfo)
            .then(res => {
                if (res.data.success) {
                    refetch()
                    setIsReivewUpdated(prev => prev + 1)
                    setIsOpen(!isOpen)
                    toast.success("Review updated")
                } else {
                    toast.error("Failed to update")
                }
            })
            .catch(err => {
                toast.error(err?.message)
            })
    }

    return (
        <div className="mt-3 mb-6">
            <h1 className="text-xl font-semibold">Update your review</h1>
            <p className="text-sm opacity-85">Edit your rating and comment below</p>

            <p className="text-sm opacity-85 mt-2.5 mb-2">Your rating *</p>
            <div className="flex items-center gap-3.5">
                <div onClick={() => ratingChanges(1)}>
                    <BsFillStarFill size={15} className={`flex cursor-pointer text-[#666666] hover:text-[#cafd10]  ${values.rating == '1' && 'text-[#cafd10]'}`} />
                </div>

                <div className=" border-l border-gray-400 h-5" />

                <div onClick={() => ratingChanges(2)} className={`flex cursor-pointer text-[#666666] hover:text-[#cafd10]  ${values.rating == '2' && 'text-[#cafd10]'}`}>
                    <BsFillStarFill size={15} />
                    <BsFillStarFill size={15} />
                </div>

                <div className=" border-l border-gray-400 h-5" />

                <div onClick={() => ratingChanges(3)} className={`flex cursor-pointer text-[#666666] hover:text-[#cafd10]  ${values.rating == '3' && 'text-[#cafd10]'}`}>
                    <BsFillStarFill size={15} />
                    <BsFillStarFill size={15} />
                    <BsFillStarFill size={15} />
                </div>
                <div className=" border-l border-gray-400 h-5" />
                <div onClick={() => ratingChanges(4)} className={`flex cursor-pointer text-[#666666] hover:text-[#cafd10]  ${values.rating == '4' && 'text-[#cafd10]'}`}>
                    <BsFillStarFill size={15} />
                    <BsFillStarFill size={15} />
                    <BsFillStarFill size={15} />
                    <BsFillStarFill size={15} />
                </div>
                <div className=" border-l border-gray-400 h-5" />
                <div onClick={() => ratingChanges(5)} className={`flex cursor-pointer text-[#666666] hover:text-[#cafd10]  ${values.rating == '5' && 'text-[#cafd10]'}`}>
                    <BsFillStarFill size={15} />
                    <BsFillStarFill size={15} />
                    <BsFillStarFill size={15} />
                    <BsFillStarFill size={15} />
                </div>
            </div>

            <p className="text-sm opacity-85 mt-4.5 mb-2">Your review *</p>
            <form onSubmit={handleUpdate} className="flex flex-col">
                <textarea value={values?.review} onChange={(e) =>
                    setValues(prev => ({
                        ...prev,
                        review: e.target.value
                    }))
                } rows={5} className=" text-base w-full lg:w-3/4 px-4 py-2 bg-[#f1f3f5] focus:bg-white focus:outline-red-600" required />

                <div className=" space-x-3 text-base">
                    <button type="submit" className="cursor-pointer bg-[#f05350] hover:bg-[#f05350dc] text-white w-[170px] px-6 py-2 font-[500] mt-4 tracking-wide">Update Review</button>
                    {/* <button type="button" className="cursor-pointer bg-[#f05350] hover:bg-[#f05350dc] text-white w-[120px] px-6 py-2 font-[500] mt-4 tracking-wide">Cancel</button> */}
                    <button type="button" onClick={() => { setIsOpen(!isOpen); setValues({ rating: myReview?.rating, review: myReview?.comment }) }}
                        className="cursor-pointer bg-white hover:bg-gray-100 text-[#f05350] border-2 border-[#f05350] w-[120px] px-6 py-[7px] font-[500] mt-4 tracking-wide">Cancel</button>
                </div>
                {/* <button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2"> Cancel </button> */}
            </form>
        </div>
    );
};

export default UpdateReveiw;