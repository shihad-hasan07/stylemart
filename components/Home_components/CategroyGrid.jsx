'use client'
import { useRouter } from "next/navigation";

export default function CategoryGrid() {
    const router = useRouter()

    const queryhandler = (query) => {
        router.push(`/shop?category=${query}`)
    }
    return (
        <div className="container mx-auto py-6">

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">

                {/* 1. Women Category */}
                <div className="relative bg-gray-100 rounded-xs overflow-hidden group min-h-[500px] md:min-h-[400px] lg:min-h-[600px] lg:row-span-1">
                    <img
                        src="/categoryGrid/women.webp"
                        alt="Women Collection"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>

                    <div className="absolute top-8 left-8 text-gray-800 max-w-[200px]">
                        <p className="text-xs mb-1 font-semibold"><span className="bg-white px-2 py-0.5 rounded-xl">28</span> Products</p>
                        <h2 onClick={() => queryhandler('Women')} className="cursor-pointer text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 mt-2">Women</h2>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 w-5/6 sm:w-fit">
                            Discover effortless style for every moment—modern cuts, soft fabrics, and pieces designed to feel as good as they look.
                        </p>

                        <ul onClick={() => queryhandler('Women')} className="cursor-pointer space-y-1 sm:space-y-1.5 md:space-y-2 text-xs sm:text-sm font-[450]">
                            <li className="hover:underline cursor-pointer">Blazers</li>
                            <li className="hover:underline cursor-pointer">Blouses & shirts</li>
                            <li className="hover:underline cursor-pointer">Dresses</li>
                            <li className="hover:underline cursor-pointer">Jackets & coats</li>
                            <li className="hover:underline cursor-pointer">Jeans</li>
                            <li className="hover:underline cursor-pointer">Knit</li>
                            <li className="hover:underline cursor-pointer">Pants</li>
                            <li className="hover:underline cursor-pointer">Skirts</li>
                            <li className="hover:underline cursor-pointer">Suits</li>
                            <li className="hover:underline cursor-pointer">Sweatshirts & Hoodies</li>
                            <li className="hover:underline cursor-pointer">T-shirts</li>
                            <li className="hover:underline cursor-pointer">Tops & Bodysuits</li>
                        </ul>
                    </div>
                </div>

                {/* Right side container for large screens */}
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">

                    {/* 2. Men Category */}
                    <div className="relative bg-gray-100 rounded-xs overflow-hidden group min-h-[220px] md:min-h-[350px]">
                        <img src="/categoryGrid/men.jpg" alt="Men Collection" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>

                        <div className="absolute top-6 left-6 text-gray-800">
                            <p className="text-xs mb-1 font-semibold"><span className="bg-white px-2 py-0.5 rounded-xl">12</span>  Products</p>
                            <h2 onClick={() => queryhandler('Men')} className="cursor-pointer text-3xl md:text-4xl lg:text-5xl font-semibold mb-3">Men</h2>

                            <ul onClick={() => queryhandler('Men')} className="cursor-pointer space-y-1 sm:space-y-1.5 md:space-y-2 text-xs sm:text-sm font-[450]">
                                <li className="hover:underline cursor-pointer">Jackets & coats</li>
                                <li className="hover:underline cursor-pointer">Jeans</li>
                                <li className="hover:underline cursor-pointer">Pants</li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom row - Shoes & Bags side by side on all screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        {/* 3. Shoes */}
                        <div className="relative bg-gray-100 rounded-xs overflow-hidden group h-[170px] sm:h-fit sm:min-h-[200px] md:min-h-[250px]">
                            <img
                                src="/categoryGrid/shoe.jpg"
                                alt="Shoes Collection"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>

                            <div className="absolute top-4 left-4 text-gray-800">
                                <p className="text-xs mb-1 font-semibold"><span className="bg-white px-2 py-0.5 rounded-xl">1</span>  Product</p>
                                <h3 className="text-2xl md:text-3xl font-bold">Shoes</h3>
                            </div>
                        </div>

                        {/* 4. Bags */}
                        <div className="relative bg-gray-100 rounded-xs overflow-hidden group h-[170px] sm:h-fit min-h-[200px] md:min-h-[250px]">
                            <img
                                src="/categoryGrid/bag.jpg"
                                alt="Bags Collection"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>

                            <div className="absolute top-4 left-4 text-gray-800">
                                <p className="text-xs mb-1 font-semibold"><span className="bg-white px-2 py-0.5 rounded-xl">3</span>  Products</p>
                                <h3 className="text-2xl md:text-3xl font-bold">Bags</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}