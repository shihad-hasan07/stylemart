"use client";

import { useEffect, useState } from "react";
import Product_card from "@/components/shared/Product_card";
import useAxios from "@/hooks/useAxios";

export default function Recently_viewed() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxios();

    useEffect(() => {
        const TTL = 48 * 60 * 60 * 1000;
        const now = Date.now();

        const stored = JSON.parse(
            localStorage.getItem("recentlyViewed") || "{}"
        );

        if (!stored.items || !stored.items.length) {
            setLoading(false);
            return;
        }

        if (!stored.lastUpdated || now - stored.lastUpdated > TTL) {
            localStorage.removeItem("recentlyViewed");
            setLoading(false);
            return;
        }

        const storedIds = stored.items;
        const idsQuery = storedIds.join(",");

        axiosPublic
            .get(`/products/multiple?ids=${idsQuery}`)
            .then(res => {
                const fetched = res.data?.data || [];

                const ordered = storedIds
                    .map(id => fetched.find(p => p._id === id))
                    .filter(Boolean);

                setProducts(ordered);
            })
            .catch(err => {
                console.error("Recently viewed fetch error:", err);
            })
            .finally(() => setLoading(false));
    }, [axiosPublic]);

    if (loading) return null;
    if (!products.length) return null;

    return (
        <section className="mt-12 mb-10">
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
