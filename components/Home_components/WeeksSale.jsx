'use client'
import { useGetAllProductsQuery } from '@/redux/features/All_Products/_allProduct_api';
import Product_card from '../shared/Product_card';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import Hero_swipeer_product_loading from '../loading_components/Hero_swipeer_product_loading';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

const WeeksSale = () => {
    const { data, error, isLoading } = useGetAllProductsQuery()
    const allProducts = data?.products || [];

    const [active, setisActive] = useState("men")
    const buttons = [
        { id: "men", buttonName: "Men" },
        { id: "women", buttonName: "Women" },
        { id: "outerwear", buttonName: "Outerwear" },
    ]

    // filter parameter men----women---outerwear
    const [filteredData, setFilteredData] = useState([])
    const handleClick = (id) => {
        setisActive(id)
        const data = allProducts.filter(res => res.categories.some(data => data.toLowerCase().includes(id)))
        setFilteredData(data)
    }

    useEffect(() => {
        handleClick('men')
    }, [allProducts])

    return (
        <div>
            {/* <hr className="opacity-15 my-4 md:my-6" /> */}
            <hr className="opacity-15 mb-4 md:mb-5" />

            {/* text part */}
            <div className='mb-4 md:mb-7 flex justify-between items-start'>
                <div className='md:flex items-center gap-7'>
                    <p className='mb-1 md:mb-0 text-xl font-semibold'>Don't miss this week's sales</p>
                    <div className='space-x-1'>
                        {
                            buttons.map((btn, idx) => (
                                <button key={idx} onClick={() => handleClick(btn.id)}
                                    className={`cursor-pointer text-[15px] font-[450] tracking-wider px-3 rounded-sm py-1
                                     ${active == btn.id
                                            ? 'bg-[#ededee] '
                                            : 'bg-white text-gray-400'
                                        }`}>
                                    {
                                        btn.buttonName
                                    }
                                </button>
                            ))
                        }
                    </div>
                </div>
                <Link href={'/shop'} className='flex items-center gap-2 font-[500] hover:text-red-600'> <p className='hidden sm:flex'>View All</p><IoIosArrowForward className='sm:hidden bg-gray-100 rounded-full w-[25] h-[25] p-1' /> <FaArrowRightLong className='hidden sm:flex' /> </Link>
            </div>

            {/* error and loading based content */}
            <div className='text-5xl '>
                {error && <div className="text-center my-10">
                    <p className="text-2xl text-red-600 font-semibold mb-3"> Couldn't load products 😞</p>
                    <button onClick={() => window.location.reload()}
                        className="cursor-pointer px-4 text-xl font-semibold tracking-wider py-1.5 bg-red-500 text-white rounded-md hover:bg-green-700 transition">
                        Retry
                    </button> </div>
                }

                {isLoading && <Hero_swipeer_product_loading></Hero_swipeer_product_loading>}
            </div>

            <Swiper
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                slidesPerView={1}
                breakpoints={{
                    500: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1120: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    filteredData?.map((product, idx) => <SwiperSlide> <Product_card home={true} key={idx} product={product}></Product_card></SwiperSlide>)
                }
            </Swiper>


        </div>
    );
};

export default WeeksSale;