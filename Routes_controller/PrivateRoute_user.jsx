"use client";

import { allContext } from "@/Auth/Authprovider";
import { useRouter, usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function PrivateRoute_user({ children }) {
    const { user, loading } = useContext(allContext);
    const router = useRouter();
    const pathname = usePathname();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Wait for auth state to be determined
        if (!loading) {
            if (!user) {
                router.replace(`/login?from=${pathname}`);
            } else {
                setIsChecking(false);
            }
        }
    }, [user, loading, pathname, router]);

    // Show loading while checking auth
    if (loading || isChecking) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f05350]"></div>
            </div>
        );
    }

    // Don't render children if no user
    if (!user) {
        return null;
    }

    return children;
}