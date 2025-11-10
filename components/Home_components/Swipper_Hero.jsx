'use client'
import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CiBadgeDollar } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { FaRegWindowRestore } from 'react-icons/fa';
import { GoIssueTrackedBy } from "react-icons/go";
import { SlLike } from "react-icons/sl";

const herodata = [
    {
        'text1': 'Exclusive offer for this week',
        "text2": "For the Stylish and fashion savvy",
        "text3": "Our collection is vast with clothes and accessories, browse our website and you'll be impressed by the selection and price we offer",
        "image": '/img1.jpg'
    },
    {
        'text1': 'Exclusive offer for this week',
        "text2": "Get the best outfit of your life",
        "text3": "Our collection is vast with clothes and accessories, browse our website and you'll be impressed by the selection and price we offer",
        'image': '/img2.jpg'
    },
    {
        'text1': 'Exclusive offer for this week',
        "text2": "The best fashion store can deliver",
        "text3": "Our collection is vast with clothes and accessories, browse our website and you'll be impressed by the selection and price we offer",
        'image': '/img3.jpg'
    }
];

const Swipper_Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showControls, setShowControls] = useState(false);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % herodata.length);
    };
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + herodata.length) % herodata.length);
    };
    const goToSlide = (index) => {
        setCurrentSlide(index);
    };
    const handleNext = () => {
        nextSlide();
    };
    const handlePrev = () => {
        prevSlide();
    };
    const handleDotClick = (index) => {
        goToSlide(index);
    };

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeInUp {
                    from { 
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .hero-fade-in {
                    animation: fadeIn 0.6s ease-out;
                }
                .hero-fade-in-up {
                    animation: fadeInUp 0.8s ease-out 0.2s both;
                }
                .hero-fade-in-up-delay {
                    animation: fadeInUp 0.8s ease-out 0.4s both;
                }
            `}} />

            <div className=" relative w-full border h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] overflow-hidden"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)} >
                {/* Slides */}
                <div className="flex h-full transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {herodata.map((slide, idx) => (
                        <div key={idx} className="min-w-full h-full relative" >
                            <img src={slide.image} alt={slide.text2} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-black/40"></div>
                            <div className=" absolute inset-0 z-10 text-white px-6 sm:px-10 
                            md:px-16 lg:px-20 flex flex-col justify-center max-w-full sm:max-w-xl md:max-w-2xl">
                                <p className="text-xs sm:text-sm mb-3 sm:mb-4 hero-fade-in">{slide.text1}</p>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight hero-fade-in-up">{slide.text2}</h1>
                                <p className="text-sm sm:text-base lg:text-lg leading-relaxed hero-fade-in-up-delay">{slide.text3}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button onClick={handlePrev} className={`absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 ${showControls ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </button>

                <button onClick={handleNext} className={`absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 ${showControls ? 'opacity-100 visible' : 'opacity-0 invisible'}`} >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </button>

                {/* Pagination Dots */}
                <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                    {herodata.map((_, idx) => (
                        <button key={idx} onClick={() => handleDotClick(idx)}
                            className={`transition-all duration-300 ${currentSlide === idx
                                ? 'w-8 h-2 bg-white rounded-full'
                                : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/75'
                                }`}
                        />
                    ))}
                </div>

            </div>
            <div className='flex overflow-auto xl:justify-center gap-10 text-[15px]  py-4'>
                <div className='flex items-center gap-1'> <CiBadgeDollar size={22} color='red' /><p className='w-[170]'>Installments Without Card</p></div>
                <div className='flex items-center gap-1.5'><FaRegWindowRestore size={17} color='red'/><p className='w-[140]'>Free pickup in stores</p></div>
                <div className='flex items-center gap-1.5'><TbTruckDelivery size={21} color='red' /><p className='w-[120] '>Delivery form $20</p></div>
                <div className='flex items-center gap-1.5'><GoIssueTrackedBy size={20} color='red'/><p className='w-[110]'>Track your order</p></div>
                <div className='flex items-center gap-1.5'><SlLike size={18} color='red' /><p className='w-[230]'>100% Cusmoter satisfaction rate</p></div>
            </div >
        </>
    );
};

export default Swipper_Hero;