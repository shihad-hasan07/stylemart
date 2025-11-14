'use client'
import Image from "next/image";
import { useRef, useState } from "react";

const MainImage = ({ images, sale, price }) => {
    const [selectedImage, setSelectedImage] = useState(0)
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);
    const imageRef = useRef(null);
    const handleMouseMove = (e) => {
        if (!imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setPosition({ x, y });
    };
    return (
        <div className="">
            {/* image zoom on hover */}
            <div ref={imageRef}
                className="relative h-[480px] sm:h-[540px] md:h-[590px] lg:h-[630px] xl:h-[700px] overflow-hidden cursor-crosshair"
                onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
            >
                <Image placeholder="blur" loading="lazy"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg=="
                    src={images[selectedImage]} fill alt={name}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 25vw, 25vw"
                    className='rounded-xs object-cover bg-[#e8e8e8] transition-transform duration-75'
                    style={{
                        transform: isHovering ? 'scale(2)' : 'scale(1)',
                        transformOrigin: `${position.x}% ${position.y}%`
                    }}
                />

                {
                    sale?.active ?
                        <div className='absolute w-12 h-12 flex items-center justify-center left-4 top-4 bg-[#e53e3e] text-lg rounded-full text-white'>
                            {((price - sale.price) / price * 100).toFixed(0)}%
                        </div>
                        : ''
                }
            </div>

            {/* main image */}
            <div className="py-3 flex flex-wrap gap-1.5">
                {
                    images?.map((image, idx) => (
                        <div key={idx} className={`cursor-pointer p-1.5 border ${idx == selectedImage ? 'border-black' : ' border-[#ecdfdf] '}`}>
                            <div className={`relative w-[65px] h-[65px] md:w-[78px] md:h-[78px]`}>
                                <Image placeholder="blur" loading="lazy" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg=="
                                    src={image} alt={name} fill
                                    className='object-cover bg-[#e8e8e8]'
                                    onClick={() => setSelectedImage(idx)}
                                >
                                </Image>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default MainImage;