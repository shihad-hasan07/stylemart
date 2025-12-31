import React, { useContext, useId, useState } from 'react';
import Star_Rating from '../shared/_Rating/Star_Rating';
import FormattedDate from '../shared/formatTime/FormattedDate';
import AddReview from '../review/AddReview';
import { allContext } from '@/Auth/Authprovider';
import { Edit2, Trash2 } from 'lucide-react';
import NoRatings from '../review/NoRatings';
import RatingBars from '../review/RatingBars';
import UpdateReveiw from '../review/UpdateReview';
import Swal from 'sweetalert2';
import useAxios from '@/hooks/useAxios';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const Reviews = ({ infoFromProducts, infoForReviews }) => {
    // const axiosPublic = useAxios()
    const axiosSecure = useAxiosSecure()
    const { userfromDB, user } = useContext(allContext)
    const { _id, slug, name, rating } = infoFromProducts;
    const { reviews = [], setIsReivewUpdated, refetch } = infoForReviews;

    const [selectedRatings, setSelectedRatings] = useState(null)

    const myReview = user && reviews?.find(review => review?.user?._id == userfromDB?._id)
    const otherReviews = user ? reviews?.filter(review => review?.user?._id !== userfromDB?._id) : reviews
    console.log(reviews);
    const ratingCounts = reviews.reduce((acc, r) => {
        acc[r.rating] = (acc[r.rating] || 0) + 1;
        return acc;
    }, {});
    const allReviews = selectedRatings ? reviews?.filter(r => r.rating == selectedRatings) : otherReviews
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = async () => {
        Swal.fire({
            title: 'Delete Review?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',

            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),

            preConfirm: async () => {
                try {
                    await axiosSecure.delete(`/reviews/${myReview._id}`)
                    setIsOpen(false)
                } catch (error) {
                    Swal.showValidationMessage(
                        'Failed to delete review'
                    )
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your review has been deleted.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })

                refetch?.();
                setIsReivewUpdated(prev => prev + 1)
            }
        })
    }

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
                                <RatingBars info={{ selectedRatings, setSelectedRatings, ratingCounts, reviews }} />
                            </div>

                            {/* my review on top ==> jdi my reviw thake tobei dekhabe */}
                            <div className={`my-4 flex flex-col border-y border-gray-200 divide-y divide-gray-200`}>
                                {
                                    !selectedRatings && myReview &&
                                    <div className=''>
                                        <div className=' flex gap-4 bg-gray-100 px-3 pt-6 pb-4 '>
                                            <div className='w-[45px] h-[45px] shrink-0'>
                                                <img referrerPolicy="no-referrer" crossOrigin="anonymous" loading="lazy"
                                                    src={user?.photoURL || '/userNull.jpg'} className='w-full h-full rounded-full' alt="" />
                                            </div>
                                            <div>
                                                <Star_Rating rating={myReview?.rating}></Star_Rating>
                                                <p className='text-sm mt-2'>
                                                    <span className='text-gray-600 font-semibold'>
                                                        {myReview?.user?.name}
                                                        <span className="ml-2 text-xs text-blue-600">(You)</span>
                                                    </span>
                                                    <span className='text-gray-500'> — <FormattedDate date={myReview?.createdAt} /></span>
                                                </p>
                                                <div className='text-[15px] mt-2.5'> {myReview?.comment} </div>

                                                <div className="flex text-xs  gap-3 pt-4 ">
                                                    <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 border border-blue-600 rounded-sm hover:bg-blue-200 hover:text-blue-900 transition">
                                                        <Edit2 className="w-3 h-3" />
                                                        <span>Edit Review</span>
                                                    </button>

                                                    <button onClick={handleDelete}
                                                        className="cursor-pointer flex items-center gap-1 px-2  bg-red-50 text-red-600 border border-red-600 rounded-sm hover:bg-red-200 hover:text-red-900 transition">
                                                        <Trash2 className="w-3 h-3" />
                                                        <span>Delete</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* update my review */}
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <UpdateReveiw info={{ _id, slug, setIsReivewUpdated, refetch, myReview, setIsOpen, isOpen }} />
                                        </div>
                                    </div>
                                }

                                {/* all the  other reviws */}
                                {
                                    allReviews.length > 0
                                        ? allReviews.map((r, idx) => (
                                            <div key={idx} className=' flex gap-4 px-3 pt-6 pb-5'>
                                                <div className='w-[45px] h-[45px] shrink-0'>
                                                    <img referrerPolicy="no-referrer" crossOrigin="anonymous" loading="lazy"
                                                        src={r?.user?.photoURL || '/userNull.jpg'} className='w-full h-full rounded-full' alt={user?.displayName} />
                                                </div>
                                                <div >
                                                    <Star_Rating rating={r?.rating}></Star_Rating>
                                                    <p className='text-sm mt-2'>
                                                        <span className='text-gray-600 font-semibold'>{r?.user?.name}</span>
                                                        <span className='text-gray-500'> — <FormattedDate date={r?.createdAt} /></span>
                                                    </p>
                                                    <div className='text-[15px] mt-2.5 '> {r?.comment} </div>
                                                </div>
                                            </div>))
                                        : selectedRatings && (
                                            <div className='py-6 px-3  text-base '>
                                                No {selectedRatings} — star reviews at the moment.
                                            </div>)
                                }
                            </div>
                        </div>
                        :
                        <NoRatings />
                }
            </div>

            {/*  add reviews */}
            <div>
                {

                    !myReview &&
                    <AddReview info={{ _id, slug, setIsReivewUpdated, refetch }} />
                }
            </div >

        </>
    );
};

export default Reviews;