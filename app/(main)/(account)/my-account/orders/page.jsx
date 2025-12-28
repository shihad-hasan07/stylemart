"use client";
import React, { useState, useEffect, useContext } from 'react';
import { Package, Clock, Truck, CheckCircle, XCircle, Loader2, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { allContext } from '@/Auth/Authprovider';
import { toast } from 'react-toastify';
import Link from 'next/link';
import SkeletonLoader from '@/components/loading_components/SkeletonLoader';
import { getStatusBadge } from '@/components/orders_components/StatusBadge';
import { getPaymentBadge } from '@/components/orders_components/PaymetnBadge';
import FilterOptions from '@/components/orders_components/FilterOptions';

const OrdersPage = () => {
    const { userfromDB, loading: userLoading } = useContext(allContext);
    const axiosPublic = useAxios();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterStatus, setFilterStatus] = useState('');
    const [expandedOrders, setExpandedOrders] = useState({});

    // Toggle order details
    const toggleOrderDetails = (orderId) => {
        setExpandedOrders(prev => ({
            ...prev,
            [orderId]: !prev[orderId]
        }));
    };

    // Fetch orders
    const fetchOrders = async (page = 1, status = '') => {
        if (!userfromDB?._id) return;

        setLoading(true);
        try {
            const statusQuery = status ? `&status=${status}` : '';
            const response = await axiosPublic.get(
                `/orders/user/${userfromDB._id}?page=${page}&limit=10${statusQuery}`
            );

            if (response.data.success) {
                setOrders(response.data.data.orders);
                setPagination(response.data.data.pagination);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userfromDB?._id && !userLoading) {
            fetchOrders(currentPage, filterStatus);
        }
    }, [userfromDB, currentPage, filterStatus, userLoading]);


    // Loading state
    if (userLoading) {
        return (
            <div className="border border-gray-200">
                <div className="bg-[#073f74] px-8 py-6">
                    <h1 className="text-3xl font-bold text-white">Orders</h1>
                    <p className="text-blue-100 mt-2">View your order history</p>
                </div>
                <div className="px-8 py-6">
                    <SkeletonLoader />
                </div>
            </div>
        );
    }

    return (
        <div className="border mt-5 border-gray-300">
            {/* Header */}
            <div className="bg-[#073f74] px-8 py-6">
                <h1 className="text-3xl font-bold text-white">Orders</h1>
                <p className="text-blue-100 mt-2">View your order history and track deliveries</p>
            </div>

            {/* Filter Options */}
            <FilterOptions setFilterStatus={setFilterStatus} filterStatus={filterStatus} loading={loading} />

            {/* Orders List */}
            <div className="px-8 py-6">
                {loading ? (
                    <SkeletonLoader />
                ) : orders.length === 0 ? (
                    <div className="text-center py-4">
                        <ShoppingBag className="w-14 h-14 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
                        <p className="text-gray-500 mb-4">You haven't placed any orders yet</p>
                        <Link href="/shop">
                            <button className="px-5 cursor-pointer py-2 bg-[#073f74] text-white font-medium hover:bg-[#062f5a] transition-colors">
                                Start Shopping
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="border border-gray-200 hover:border-gray-300 transition-all">
                                {/* Order Header - Always Visible */}
                                <div
                                    onClick={() => toggleOrderDetails(order._id)}
                                    className="bg-gray-50 px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex flex-wrap items-center gap-6">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Order Number</p>
                                            <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Date</p>
                                            <p className="font-medium text-gray-700">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Total</p>
                                            <p className="font-bold text-gray-900">৳{order.pricing.total.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {getStatusBadge(order.orderStatus)}
                                        {expandedOrders[order._id] ? (
                                            <ChevronUp className="w-5 h-5 text-gray-500" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-500" />
                                        )}
                                    </div>
                                </div>

                                {/* Expandable Details */}
                                {expandedOrders[order._id] && (
                                    <div className="px-6 py-4 bg-white border-t">
                                        {/* Products */}
                                        <div className="space-y-3 mb-4">
                                            {order.products.map((item, index) => (
                                                <div key={index} className="flex gap-3">
                                                    <div className="w-14 h-14 bg-gray-100 shrink-0 overflow-hidden">
                                                        {item.image ? (
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <Package className="w-6 h-6 text-gray-300" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                                        <p className="text-xs text-gray-600">
                                                            {item.selectedColor && `${item.selectedColor}`}
                                                            {item.selectedSize && ` • ${item.selectedSize}`}
                                                            {` • Qty: ${item.quantity}`}
                                                        </p>
                                                        <p className="text-sm font-semibold text-gray-900 mt-0.5">
                                                            ৳{(item.price * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Delivery & Payment Info */}
                                        <div className="grid md:grid-cols-2 gap-4 pt-4 border-t text-sm">
                                            <div>
                                                <p className="font-semibold text-gray-900 mb-1">Delivery Address</p>
                                                <p className="text-gray-700 text-xs leading-relaxed">
                                                    {order.customerInfo.name}<br />
                                                    {order.customerInfo.streetAddress}<br />
                                                    {order.customerInfo.city}, {order.customerInfo.district}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 mb-1">Payment Details</p>
                                                <div className="space-y-1 text-xs text-gray-700">
                                                    {getPaymentBadge(order.paymentInfo.paymentStatus)}
                                                    <p className="mt-2">Method: <span className="font-medium capitalize">{order.paymentInfo.paymentMethod}</span></p>
                                                    <p>Paid: <span className="font-medium">৳{order.paymentInfo.advanceAmount.toFixed(2)}</span></p>
                                                    {order.paymentInfo.payableOnDelivery > 0 && (
                                                        <p>Due: <span className="font-medium text-orange-600">৳{order.paymentInfo.payableOnDelivery.toFixed(2)}</span></p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Previous
                        </button>

                        <div className="flex gap-2">
                            {[...Array(pagination.totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-2 text-sm font-medium transition-colors ${currentPage === i + 1
                                        ? 'bg-[#073f74] text-white'
                                        : 'border hover:bg-gray-50'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                            disabled={currentPage === pagination.totalPages}
                            className="px-4 py-2 border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                )}

                {/* Total Orders Count */}
                {pagination && (
                    <div className="mt-4 text-center text-sm text-gray-600">
                        Showing {orders.length} of {pagination.totalOrders} orders
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;