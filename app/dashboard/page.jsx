'use client'
import { useState, useEffect } from 'react';
import { DollarSign, ShoppingCart, Package, Users, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import DashboardLoading from './components/Loader/DashboardLoading';
import Routes_heading_texts from './components/shared/Routes_heading_texts';

const DashboardPage = () => {
    const axiosSecure = useAxiosSecure();
    const router = useRouter();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // progressing data fetching.. first  dashboard er stats asbe then.. order gula asbe.
    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            axiosSecure.get('/dashboard').then(statsRes => {
                if (statsRes.data.success) {
                    setDashboardData(prev => ({
                        ...prev,
                        stats: statsRes.data.data.stats,
                        alerts: statsRes.data.data.alerts
                    }));
                    setLoading(false);
                }
            });

            const ordersRes = await axiosSecure.get('/orders/all', {
                params: { page: 1, limit: 5 }
            });

            if (ordersRes.data.success) {
                setDashboardData(prev => ({
                    ...prev,
                    recentOrders: ordersRes.data.data.orders
                }));
            }
        } catch (error) {
            toast.error('Failed to fetch dashboard data');
            setLoading(false);
        }
    };

    // Format currency
    const formatCurrency = (amount) => {
        return `৳${amount.toLocaleString()}`;
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Get status badge color
    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-700',
            confirmed: 'bg-blue-100 text-blue-700',
            processing: 'bg-purple-100 text-purple-700',
            shipped: 'bg-indigo-100 text-indigo-700',
            delivered: 'bg-green-100 text-green-700',
            cancelled: 'bg-red-100 text-red-700'
        };
        return colors[status] || 'bg-gray-100 text-gray-700';
    };

    // Parse percentage change
    const parseChange = (changeStr) => {
        const value = parseFloat(changeStr);
        return {
            value,
            isPositive: value >= 0,
            display: changeStr
        };
    };

    const stats = dashboardData?.stats || {};
    const alerts = dashboardData?.alerts || {};
    const recentOrders = dashboardData?.recentOrders || [];

    if (loading) return <DashboardLoading />
    return (
        <div>
            <Routes_heading_texts name={'dashboard'} />

            <div className="p-4 sm:p-6 space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Revenue */}
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-gray-600" />
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-medium ${parseChange(stats.revenueChange).isPositive ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {parseChange(stats.revenueChange).isPositive ? (
                                    <TrendingUp className="w-4 h-4" />
                                ) : (
                                    <TrendingDown className="w-4 h-4" />
                                )}
                                {stats.revenueChange}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {formatCurrency(stats.totalRevenue || 0)}
                        </p>
                    </div>

                    {/* Orders */}
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <ShoppingCart className="w-6 h-6 text-gray-600" />
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-medium ${parseChange(stats.ordersChange).isPositive ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {parseChange(stats.ordersChange).isPositive ? (
                                    <TrendingUp className="w-4 h-4" />
                                ) : (
                                    <TrendingDown className="w-4 h-4" />
                                )}
                                {stats.ordersChange}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Orders</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {stats.totalOrders?.toLocaleString() || 0}
                        </p>
                    </div>

                    {/* Products */}
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Package className="w-6 h-6 text-gray-600" />
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-medium ${parseChange(stats.productsChange).isPositive ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {parseChange(stats.productsChange).isPositive ? (
                                    <TrendingUp className="w-4 h-4" />
                                ) : (
                                    <TrendingDown className="w-4 h-4" />
                                )}
                                {stats.productsChange}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Products</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {stats.totalProducts?.toLocaleString() || 0}
                        </p>
                    </div>

                    {/* Customers */}
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-gray-600" />
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-medium ${parseChange(stats.customersChange).isPositive ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {parseChange(stats.customersChange).isPositive ? (
                                    <TrendingUp className="w-4 h-4" />
                                ) : (
                                    <TrendingDown className="w-4 h-4" />
                                )}
                                {stats.customersChange}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Customers</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {stats.totalCustomers?.toLocaleString() || 0}
                        </p>
                    </div>
                </div>

                {/* Alert Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Pending Orders */}
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 shadow-sm border border-yellow-200">
                        <div className="flex items-start gap-3 mb-4">
                            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg font-semibold text-yellow-900">Pending Orders</h3>
                            </div>
                        </div>
                        <p className="text-4xl font-bold text-yellow-700 mb-4">
                            {alerts.pendingOrders || 0}
                        </p>
                        <button
                            onClick={() => router.push('/dashboard/orders')}
                            className="text-sm cursor-pointer font-medium text-yellow-700 hover:text-yellow-800 border-b border-yellow-700"
                        >
                            View all pending orders →
                        </button>
                    </div>

                    {/* Low Stock Alert */}
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 shadow-sm border border-red-200">
                        <div className="flex items-start gap-3 mb-4">
                            <Package className="w-6 h-6 text-red-600 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg font-semibold text-red-900">Low Stock Alert</h3>
                            </div>
                        </div>
                        <p className="text-4xl font-bold text-red-700 mb-4">
                            {alerts.lowStock || 0}
                        </p>
                        <button
                            onClick={() => router.push('/dashboard/products')}
                            className="text-sm cursor-pointer font-medium text-red-700 hover:text-red-800 border-b border-red-700"
                        >
                            View products →
                        </button>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                        <button
                            onClick={() => router.push('/dashboard/orders')}
                            className="text-sm cursor-pointer font-medium text-blue-600 hover:text-blue-700"
                        >
                            View All
                        </button>
                    </div>

                    {/* Table Header - Desktop */}
                    <div className="hidden lg:block px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 uppercase">
                            <div className="col-span-2">Order ID</div>
                            <div className="col-span-2">Customer</div>
                            <div className="col-span-3">Product</div>
                            <div className="col-span-2 text-right">Amount</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-1">Date</div>
                        </div>
                    </div>

                    {/* Orders List */}
                    <div className="divide-y divide-gray-200">
                        {recentOrders.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">
                                <p className="text-lg font-medium mb-2">No recent orders</p>
                                <p className="text-sm">New orders will appear here</p>
                            </div>
                        ) : (
                            recentOrders.map((order, index) => (
                                <div key={index} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                                    {/* Desktop View */}
                                    <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                                        <div className="col-span-2">
                                            <span className="font-semibold text-gray-900">{order.orderNumber}</span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-sm text-gray-700">{order.customerInfo?.name || 'N/A'}</span>
                                        </div>
                                        <div className="col-span-3">
                                            <span className="text-sm text-gray-700">
                                                {order.products?.[0]?.name || 'N/A'}
                                                {order.products && order.products.length > 1 && (
                                                    <span className="text-gray-500 ml-1">+{order.products.length - 1} more</span>
                                                )}
                                            </span>
                                        </div>
                                        <div className="col-span-2 text-right">
                                            <span className="font-semibold text-gray-900">
                                                {formatCurrency(order.pricing?.total || 0)}
                                            </span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                                                {order.orderStatus?.charAt(0).toUpperCase() + order.orderStatus?.slice(1)}
                                            </span>
                                        </div>
                                        <div className="col-span-1">
                                            <span className="text-sm text-gray-600">
                                                {formatDate(order.createdAt)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Mobile View */}
                                    <div className="lg:hidden space-y-3">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                                                <p className="text-sm text-gray-600">{order.customerInfo?.name || 'N/A'}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                                                {order.orderStatus?.charAt(0).toUpperCase() + order.orderStatus?.slice(1)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                            <div>
                                                <p className="text-sm text-gray-700">{order.products?.[0]?.name || 'N/A'}</p>
                                                {order.products && order.products.length > 1 && (
                                                    <p className="text-xs text-gray-500">+{order.products.length - 1} more items</p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900">{formatCurrency(order.pricing?.total || 0)}</p>
                                                <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;