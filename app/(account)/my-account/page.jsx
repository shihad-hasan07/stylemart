'use client'
import { allContext } from '@/Auth/Authprovider';
import { useContext } from 'react';
import { User, Mail, Calendar, Shield, Heart, ShoppingCart, Package, Edit, LogOut, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';


const UserProfile_page = () => {
    const { user, userfromDB, loading, logOut } = useContext(allContext);
    const { totalItems } = useSelector(state => state.cart)
    const { wishlistProducts } = useSelector(state => state.wishlist)

    // user loading  thakle...
    if (loading) {
        return <p className="text-2xl">user Loading...</p>;
    }

    // Example data -
    const userStats = {
        wishlistCount: 12,
        cartCount: 3,
        orderCount: 8
    };

    if (!user) {
        return (
            <div className="text-center text-3xl pt-7 pl-5"><Link href='/login'>Please login to continue...</Link></div>
        );
    }

    return (
        <div className="min-h-screen  py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
                    {/* Left Sidebar - Profile Card */}
                    <div className="lg:col-span-2 lg:sticky top-0 self-start">
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
                            {/* Header */}
                            <div className="bg-[#073f74]  h-20 sm:h-24"></div>

                            {/* Profile Info */}
                            <div className="relative px-4 sm:px-6 pb-6">
                                {/* Avatar */}
                                <div className="flex justify-center -mt-10 sm:-mt-12 mb-4">
                                    {user?.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || 'User'}
                                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-lg object-cover"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-lg flex items-center justify-center">

                                            <img src='/userNull.jpg' className='w-full h-full object-cover rounded-full' alt="" />
                                        </div>
                                    )}
                                </div>

                                {/* Name */}
                                <div className="text-center mb-4">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 px-2">
                                        {user.displayName || 'User'}
                                    </h2>
                                    {user.emailVerified && (
                                        <div className="flex items-center justify-center gap-1 text-green-600">
                                            <Shield className="w-4 h-4" />
                                            <span className="text-sm">Verified</span>
                                        </div>
                                    )}
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                                    <div className="text-center p-2 sm:p-3 bg-red-50 rounded-lg hover:bg-red-100 transition cursor-pointer">
                                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mx-auto mb-1" />
                                        <p className="text-lg sm:text-2xl font-bold text-gray-800">{wishlistProducts?.length}</p>
                                        <p className="text-xs text-gray-600">Wishlist</p>
                                    </div>
                                    <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition cursor-pointer">
                                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mx-auto mb-1" />
                                        <p className="text-lg sm:text-2xl font-bold text-gray-800">{totalItems}</p>
                                        <p className="text-xs text-gray-600">Cart</p>
                                    </div>
                                    <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg hover:bg-green-100 transition cursor-pointer">
                                        <Package className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mx-auto mb-1" />
                                        <p className="text-lg sm:text-2xl font-bold text-gray-800">{userStats.orderCount}</p>
                                        <p className="text-xs text-gray-600">Orders</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-2">

                                    <Link href={'/my-account/update-profile'}>
                                        <button className="cursor-pointer w-full flex items-center justify-center gap-3 px-4 py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition font-medium">
                                            <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="text-sm sm:text-base">Update Profile</span>
                                        </button>
                                    </Link>
                                    <button onClick={logOut}
                                        className="cursor-pointer w-full flex items-center justify-center gap-3 px-4 py-2.5 sm:py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition font-medium">
                                        <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="text-sm sm:text-base">Logout</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Details */}
                    <div className="lg:col-span-3 space-y-4 sm:space-y-6">
                        {/* Personal Information */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                                Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                    <div className="flex items-start gap-3">
                                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mt-1 " />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs sm:text-sm text-gray-500 mb-1">Email</p>
                                            <p className="text-sm sm:text-base text-gray-800 font-medium ">{user.email}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mt-1 " />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs sm:text-sm text-gray-500 mb-1">Phone Number</p>
                                            <p className="text-sm sm:text-base text-gray-800 font-medium">{userfromDB?.phone || 'Add phone number'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition md:col-span-2">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mt-1 " />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs sm:text-sm text-gray-500 mb-1">Address</p>
                                            <p className="text-sm sm:text-base text-gray-800 font-medium wrap-break-word">
                                                {
                                                    [
                                                        userfromDB?.address?.division,
                                                        userfromDB?.address?.city,
                                                        userfromDB?.address?.address
                                                    ]
                                                        .filter(Boolean)
                                                        .join(", ")
                                                    || "Add your address"
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Details */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                                Account Details
                            </h3>
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs sm:text-sm text-gray-500">User ID</p>
                                        <p className="text-xs sm:text-sm text-gray-800 font-mono mt-1 break-all">{user.uid}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition gap-2">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs sm:text-sm text-gray-500">Join Date</p>
                                        <p className="text-sm sm:text-base text-gray-800 font-medium mt-1">
                                            {user.metadata?.creationTime && new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 " />
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition gap-2">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs sm:text-sm text-gray-500">Last Login</p>
                                        <p className="text-sm sm:text-base text-gray-800 font-medium mt-1">
                                            {user.metadata?.lastSignInTime && new Date(user.metadata.lastSignInTime).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Quick Access</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                <button className="p-4 sm:p-5  from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 rounded-lg transition text-left">
                                    <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 mb-2" />
                                    <p className="font-bold text-gray-800 text-sm sm:text-base">Wishlist</p>
                                    <p className="text-xs sm:text-sm text-gray-600">{wishlistProducts?.length} items</p>
                                </button>

                                <button className="p-4 sm:p-5  from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-lg transition text-left">
                                    <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mb-2" />
                                    <p className="font-bold text-gray-800 text-sm sm:text-base">Cart</p>
                                    <p className="text-xs sm:text-sm text-gray-600">{totalItems} items</p>
                                </button>

                                <button className="p-4 sm:p-5  from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-lg transition text-left sm:col-span-2 lg:col-span-1">
                                    <Package className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 mb-2" />
                                    <p className="font-bold text-gray-800 text-sm sm:text-base">Orders</p>
                                    <p className="text-xs sm:text-sm text-gray-600">{userStats.orderCount} orders</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile_page;