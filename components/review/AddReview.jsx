import { useState } from "react";
import axios from "axios";

const AddReview = ({ productId, userId, onReviewAdded }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!rating) {
            alert("Rating is required");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post("/api/reviews", {
                productId,
                userId,
                rating,
                comment,
            });

            // optional: parent কে জানানো (reviews refetch করতে)
            if (onReviewAdded) {
                onReviewAdded(res.data.data);
            }

            setComment("");
            setRating(5);
            alert("Review added successfully");
        } catch (error) {
            alert(
                error?.response?.data?.message || "Failed to add review"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <h3 className="text-lg font-semibold">Add your review</h3>

            {/* Rating */}
            <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border px-3 py-2 w-full"
            >
                <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                <option value={4}>⭐⭐⭐⭐ (4)</option>
                <option value={3}>⭐⭐⭐ (3)</option>
                <option value={2}>⭐⭐ (2)</option>
                <option value={1}>⭐ (1)</option>
            </select>

            {/* Comment */}
            <textarea
                placeholder="Write your review..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border px-3 py-2 w-full"
                rows={4}
            />

            <button
                type="submit"
                disabled={loading}
                className="bg-black text-white px-4 py-2 disabled:opacity-50"
            >
                {loading ? "Submitting..." : "Submit Review"}
            </button>
        </form>
    );
};

export default AddReview;
