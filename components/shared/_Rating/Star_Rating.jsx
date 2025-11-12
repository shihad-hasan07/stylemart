'use client'
import { FaStar } from "react-icons/fa"

export default function Star_Rating({ rating }) {
    return (
        <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
                <FaStar
                    key={index}
                    size={13}
                    color={index < rating ? "#fcc419" : "#e5e7eb"}
                />
            ))}
        </div>
    )
}