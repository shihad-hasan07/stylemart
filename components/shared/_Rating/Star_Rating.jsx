'use client'
import { FaStar } from "react-icons/fa"

export default function Star_Rating({ rating, big }) {
    return (
        <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
                <FaStar
                    key={index}
                    // size={13}
                    // size={`${big ? '32' : '13'} `}
                    className={`${big ? 'text-2xl' : 'text-[13px]'}`}
                    color={index < rating ? "#fcc419" : "#e5e7eb"}
                />
            ))}
        </div>
    )
}