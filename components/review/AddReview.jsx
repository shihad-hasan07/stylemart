'use client'
import { allContext } from "@/Auth/Authprovider";
import useAxios from "@/hooks/useAxios";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { toast } from "react-toastify";

const AddReview = ({ info }) => {
    const { _id, slug, setIsReivewUpdated, refetch } = info
    const { user, userfromDB } = useContext(allContext)
    const axiosSecure = useAxiosSecure()
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const [values, setValues] = useState({
        rating: 0,
        review: ''
    })

    const ratingChanges = (rating) => {
        setValues(prev => (
            {
                ...prev,
                rating: rating
            }
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (values.rating == 0) {
            return alert('Please select a rating first')
        }
        if (!user) {
            return router.push(`/login?from=/shop/${_id}/${slug}?active=reviews`);
        }
        const finalReviewsInfo = {
            productId: _id,
            rating: values?.rating,
            comment: values?.review
        }

        setLoading(true)
        axiosSecure.post('/reviews', finalReviewsInfo)
            .then(res => {
                if (res.data.success) {
                    refetch()
                    toast.success('Review added')
                    setIsReivewUpdated(prev => prev + 1)
                }
            })
            .catch(err => {
                toast.error(err?.message)
                console.log('failed to add ', err)
                setLoading(false)
            })

        console.log('finalReviewsInfo', finalReviewsInfo);
    }
    return (
        <div>
            <h1 className="text-xl font-semibold">Add a review</h1>
            <p className="text-sm opacity-85">Your email address will not be published. Required fields are marked *</p>

            <p className="text-sm opacity-85 mt-4.5 mb-2">Your rating *</p>
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
            <form onSubmit={handleSubmit} className="flex flex-col">
                <textarea onChange={(e) =>
                    setValues(prev => ({
                        ...prev,
                        review: e.target.value
                    }))
                } rows={5} className=" w-full lg:w-3/4 px-4 py-2 bg-[#f1f3f5] focus:bg-white focus:outline-red-600" required />



                <button
                    type="submit"
                    disabled={loading}
                    className={` relative flex items-center justify-center gap-2 w-[170px] px-6 py-2 font-[500] mt-4 tracking-wide text-white
                          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#f05350] hover:bg-[#f05350dc] cursor-pointer"}`}
                >
                    {loading
                        ? (<>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Submitting...</>)
                        : (
                            "Submit"
                        )}
                </button>
            </form>
        </div>
    );
};

export default AddReview;
