"use client";

import { useEffect, useState } from "react";
import Product_card from "@/components/shared/Product_card";
import useAxios from "@/hooks/useAxios";

export default function Recently_viewed() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxios()

    useEffect(() => {
        const storedIds = JSON.parse(
            localStorage.getItem("recentlyViewed") || "[]"
        );

        if (!storedIds.length) {
            setLoading(false);
            return;
        }

        const idsQuery = storedIds.join(",");

        axiosPublic
            .get(`/products/multiple?ids=${idsQuery}`)
            .then(res => {
                const fetched = res.data?.data || [];

                // keep localStorage order (latest first)
                const ordered = storedIds
                    .map(id => fetched.find(p => p._id === id))
                    .filter(Boolean);

                setProducts(ordered);
            })
            .catch(err => {
                console.error("Recently viewed fetch error:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return null;
    if (!products.length) return null;

    return (
        <section className="mt-12">
            <h2 className="text-xl font-semibold mb-6">
                Recently Viewed
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {products.map(product => (
                    <Product_card
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
}
