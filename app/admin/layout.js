'use client';

import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { allContext } from '@/Auth/Authprovider';
import Loader from '@/components/loading_components/Loader';
import Sidebar from './components/Sidebar/Sidebar';
import { SidebarProvider } from './components/Sidebar/sidebarContext/sidebarContext';
import Header from './components/Header';

const ALLOWED_ROLES = ['admin', 'manager', 'staff'];

export default function AdminLayout({ children }) {
    const { user, logOut, loading, userfromDB } = useContext(allContext);
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        if (!user) {
            router.replace('/login?from=/admin');
            return;
        }

        if (userfromDB && !ALLOWED_ROLES.includes(userfromDB?.role)) {
            router.replace('/');
        }
    }, [loading, user, userfromDB, router]);

    if (loading || (user && !userfromDB)) {
        return <div className='w-full h-screen flex items-center justify-center'>
            <Loader />
        </div>
    }

    if (!user || !ALLOWED_ROLES.includes(userfromDB?.role)) {
        return null;
    }


    return (
        <SidebarProvider>
            <div className="flex h-screen overflow-hidden">
                <Sidebar role={userfromDB?.role} />

                <div className="flex flex-col flex-1">
                    <Header info={{ user, logOut }} />
                    <main className="flex-1 overflow-y-auto bg-gray-200">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
