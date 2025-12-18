"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";

export default function WishlistModal() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const isOpen = searchParams.get("wishlist") === "true";
    const productName = searchParams.get("product");

    const closeModal = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("wishlist");
        params.delete("product");
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    if (!isOpen) return null;

    return (
        <div onClick={closeModal} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-[350px] bg-white rounded-xs pt-8 px-10 pb-10 text-center"
            >
                <p className="text-sm text-gray-700 ">
                    <span className="font-bold inline-block pb-1">{productName}</span>
                    <br />
                    <span >has been added to your Wishlist.</span>
                </p>

                <Link href={'/wishlist'}>
                    <button className="cursor-pointer w-full flex items-center justify-center gap-2 py-2.5 bg-red-500 text-white rounded-xs my-3 text-sm font-semibold">
                        <FaRegHeart strokeWidth={12} />
                        View Wishlist
                    </button>
                </Link>
                <button onClick={closeModal}
                    className="cursor-pointer w-full flex items-center justify-center gap-1.5 py-2.5 bg-red-500 text-white rounded-xs text-sm font-semibold">
                    <X strokeWidth={3} size={18} /> Close </button>
            </div>
        </div>
    );
}
