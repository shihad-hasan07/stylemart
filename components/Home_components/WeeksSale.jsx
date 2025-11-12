'use client'
import { useGetAllProductsQuery } from '@/redux/features/All_Products/_allProduct_api';
import Product_card from '../shared/Product_card';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import Hero_swipeer_product_loading from '../loading_components/Hero_swipeer_product_loading';


const WeeksSale = () => {
    const { data: allProducts = [], error, isLoading } = useGetAllProductsQuery()
    console.log('datass', allProducts)
    const loading = true
    return (
        <div className='my-10  '>
            <div className='text-5xl '>
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
                    allProducts?.map((product, idx) => <SwiperSlide> <Product_card key={idx} product={product}></Product_card></SwiperSlide>)
                }
            </Swiper>


        </div>
    );
};

export default WeeksSale;