"use client";
import React, { useState, useEffect } from 'react';
import Routes_heading_texts from '../../components/shared/Routes_heading_texts';
import { Loader2, Package, Search, ChevronDown, ChevronUp, Phone, Edit2, MoreVertical } from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import { useParams, useSearchParams } from 'next/navigation';

const Order_page = () => {
    const axiosSecure = useAxios();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [activeTab, setActiveTab] = useState('');
    const [expandedOrders, setExpandedOrders] = useState({});
    const [updatingOrder, setUpdatingOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [openMenuId, setOpenMenuId] = useState(null);

    // Toggle order details
    const toggleOrderDetails = (orderId) => {
        setExpandedOrders(prev => ({
            ...prev,
            [orderId]: !prev[orderId]
        }));
    };

    // Fetch orders
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await axiosSecure.get(`/orders/all`, {
                params: {
                    status: activeTab || undefined,
                    page: currentPage,
                    limit: 10
                }
            });

            if (response.data.success) {
                setOrders(response.data.data.orders);
                setTotalPages(response.data.data.pagination.totalPages);
                setTotalOrders(response.data.data.pagination.totalOrders);
            }
        } catch (error) {
            console.error('Fetch orders error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [activeTab, currentPage]);


    // Update order status
    const handleOrderStatusUpdate = async (orderId, newStatus, e) => {
        e.stopPropagation();
        setUpdatingOrder(orderId);
        try {
            const response = await axiosSecure.patch(
                `/orders/${orderId}/status`,
                { orderStatus: newStatus }
            );

            if (response.data.success) {
                setOrders(orders.map(order =>
                    order._id === orderId
                        ? { ...order, orderStatus: newStatus }
                        : order
                ));
            }
        } catch (error) {
            console.error('Update status error:', error);
            alert(error.response?.data?.message || 'Failed to update status');
        } finally {
            setUpdatingOrder(null);
        }
    };

    // Update payment status
    const handlePaymentStatusUpdate = async (orderId, newStatus, e) => {
        e.stopPropagation();
        setUpdatingOrder(orderId);
        try {
            const response = await axiosSecure.patch(
                `/orders/${orderId}/payment`,
                { paymentStatus: newStatus }
            );

            if (response.data.success) {
                setOrders(orders.map(order =>
                    order._id === orderId
                        ? {
                            ...order,
                            paymentInfo: {
                                ...order.paymentInfo,
                                paymentStatus: newStatus
                            }
                        }
                        : order
                ));
            }
        } catch (error) {
            console.error('Update payment status error:', error);
            alert(error.response?.data?.message || 'Failed to update payment status');
        } finally {
            setUpdatingOrder(null);
        }
    };

    // Get status badge color
    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
            processing: 'bg-purple-100 text-purple-700 border-purple-200',
            shipped: 'bg-indigo-100 text-indigo-700 border-indigo-200',
            delivered: 'bg-green-100 text-green-700 border-green-200',
            cancelled: 'bg-red-200 text-red-700 border-red-300'
        };
        return colors[status] || colors.pending;
    };

    // Filter orders by search
    const filteredOrders = orders.filter(order => {
        const searchLower = searchTerm.toLowerCase();
        return (
            order.orderNumber?.toLowerCase().includes(searchLower) ||
            order.customerInfo?.name?.toLowerCase().includes(searchLower) ||
            order.customerInfo?.city?.toLowerCase().includes(searchLower) ||
            order.customerInfo?.district?.toLowerCase().includes(searchLower) ||
            order.paymentInfo?.transactionId?.toLowerCase().includes(searchLower) ||
            order.paymentInfo?.senderNumber?.toLowerCase().includes(searchLower)
        );
    });

    // Tabs config
    const tabs = [
        { label: 'All Orders', value: '' },
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' }
    ];

    return (
        <div className="min-h-screen ">
            <Routes_heading_texts name={'orders'} total={totalOrders} />

            {/* Filter and Search Section */}
            <div className='px-6 m-5 bg-white rounded-xl py-5 border border-gray-200'>
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => {
                                    setActiveTab(tab.value);
                                    setCurrentPage(1);
                                }}
                                className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors rounded-md ${activeTab === tab.value
                                    ? 'bg-red-500 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mt-4">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by order number, customer name, city..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-gray-900 text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-xl mx-5 my-5 overflow-hidden border border-gray-200">
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="text-center py-16">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">
                            {searchTerm ? 'No orders found matching your search' : 'No orders found'}
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Table Header - Hidden on mobile */}
                        <div className="hidden md:grid md:grid-cols-[0.8fr_1.2fr_1fr_1fr_0.8fr_0.5fr] gap-4 px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <div className="text-sm font-medium text-gray-600">ORDER NO.</div>
                            <div className="text-sm font-medium text-gray-600">CUSTOMER</div>
                            <div className="text-sm font-medium text-gray-600 text-center">DATE</div>
                            <div className="text-sm font-medium text-gray-600 text-center">TOTAL</div>
                            <div className="text-sm font-medium text-gray-600 text-center">STATUS</div>
                            <div className="text-sm font-medium text-gray-600 text-center">ACTIONS</div>
                        </div>

                        {/* Orders List */}
                        <div className="divide-y divide-gray-200">
                            {filteredOrders.map((order) => (
                                <div key={order._id}>
                                    {/* Mobile View */}
                                    <div className="md:hidden">
                                        <div className="flex items-start gap-3 bg-white p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="font-semibold text-gray-900 text-sm">
                                                        {order.orderNumber}
                                                    </h3>
                                                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusColor(order.orderStatus)}`}>
                                                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                                                    </span>
                                                </div>

                                                <p className="text-sm text-gray-700 mb-1">{order.customerInfo?.name}</p>
                                                <p className="text-xs text-gray-500 mb-2">
                                                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    <span className="font-bold text-gray-900">৳{order.pricing?.total?.toFixed(2)}</span>
                                                    <button
                                                        onClick={() => toggleOrderDetails(order._id)}
                                                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                                    >
                                                        {expandedOrders[order._id] ? 'Hide Details' : 'View Details'}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="relative">
                                                <button
                                                    onClick={() => setOpenMenuId(openMenuId === order._id ? null : order._id)}
                                                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <MoreVertical size={18} className="text-gray-600" />
                                                </button>
                                                {openMenuId === order._id && (
                                                    <>
                                                        <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)}></div>
                                                        <div className="absolute right-0 top-8 z-20 bg-white rounded-sm shadow-lg border border-gray-200 min-w-[140px]">
                                                            <button
                                                                className="w-full flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 text-left text-sm text-gray-700"
                                                                onClick={() => {
                                                                    setOpenMenuId(null);
                                                                    toggleOrderDetails(order._id);
                                                                }}
                                                            >
                                                                <Edit2 size={16} className="text-blue-600" />
                                                                <span>View/Edit</span>
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Desktop View */}
                                    <div
                                        className="hidden md:grid md:grid-cols-[0.8fr_1.2fr_1fr_1fr_0.8fr_0.5fr] gap-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => toggleOrderDetails(order._id)}
                                    >
                                        <div className="flex items-center">
                                            <span className="font-medium text-gray-900 text-sm">{order.orderNumber}</span>
                                        </div>

                                        <div className="flex flex-col justify-center">
                                            <span className="font-medium text-gray-900 text-sm">{order.customerInfo?.name}</span>
                                            <span className="text-xs text-gray-500">{order.customerInfo?.phone}</span>
                                        </div>

                                        <div className="flex items-center justify-center">
                                            <span className="text-sm text-gray-700">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-center">
                                            <span className="font-bold text-gray-900">৳{order.pricing?.total?.toFixed(2)}</span>
                                        </div>

                                        <div className="flex items-center justify-center">
                                            <span className={`px-3 py-1.5 rounded-md text-xs font-medium border ${getStatusColor(order.orderStatus)}`}>
                                                {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-center">
                                            {expandedOrders[order._id] ? (
                                                <ChevronUp className="w-5 h-5 text-gray-600" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-600" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Expandable Details */}
                                    {expandedOrders[order._id] && (
                                        <div className="px-4 md:px-6 py-6 bg-white border-t border-gray-200" onClick={(e) => e.stopPropagation()}>
                                            <div className="grid lg:grid-cols-3 gap-6">
                                                {/* Products & Customer Info */}
                                                <div className="lg:col-span-2 space-y-6">
                                                    {/* Products */}
                                                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Order Items</h3>
                                                        <div className="space-y-3">
                                                            {order.products?.map((item, index) => (
                                                                <div key={index} className="flex gap-3 pb-3 border-b border-gray-100 last:border-0">
                                                                    <div className="w-14 h-14 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
                                                                        {item.image ? (
                                                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                                        ) : (
                                                                            <div className="w-full h-full flex items-center justify-center">
                                                                                <Package className="w-6 h-6 text-gray-300" />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <p className="text-sm font-medium text-gray-900 mb-1">{item.name}</p>
                                                                        <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-1">
                                                                            {item.selectedColor && (
                                                                                <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded">
                                                                                    {item.selectedColor}
                                                                                </span>
                                                                            )}
                                                                            {item.selectedSize && (
                                                                                <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded">
                                                                                    {item.selectedSize}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        <div className="flex items-center justify-between">
                                                                            <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                                                                            <span className="text-sm font-semibold text-gray-900">
                                                                                ৳{(item.price * item.quantity).toFixed(2)}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Customer Info */}
                                                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Customer Information</h3>
                                                        <div className="text-sm text-gray-700 space-y-1.5">
                                                            <p className="font-medium text-gray-900">{order.customerInfo?.name}</p>
                                                            <p className="flex items-center gap-2 font-semibold text-gray-900">
                                                                <Phone className="w-4 h-4 text-gray-600" />
                                                                {order.customerInfo?.phone}
                                                            </p>
                                                            <div className="pt-2 border-t border-gray-200 mt-2">
                                                                <p>{order.customerInfo?.streetAddress}</p>
                                                                <p>{order.customerInfo?.city}, {order.customerInfo?.district}</p>
                                                            </div>
                                                            {order.customerInfo?.email && (
                                                                <p className="text-xs text-gray-600 pt-2 border-t border-gray-200 mt-2">
                                                                    {order.customerInfo.email}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Status & Payment Controls */}
                                                <div className="space-y-6">
                                                    {/* Order Status */}
                                                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Order Status</h3>
                                                        <select
                                                            value={order.orderStatus}
                                                            onChange={(e) => handleOrderStatusUpdate(order._id, e.target.value, e)}
                                                            onClick={(e) => e.stopPropagation()}
                                                            disabled={updatingOrder === order._id}
                                                            className="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                        >
                                                            <option value="pending">Pending</option>
                                                            <option value="confirmed">Confirmed</option>
                                                            <option value="processing">Processing</option>
                                                            <option value="shipped">Shipped</option>
                                                            <option value="delivered">Delivered</option>
                                                            <option value="cancelled">Cancelled</option>
                                                        </select>
                                                    </div>

                                                    {/* Payment Info */}
                                                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment Details</h3>
                                                        <div className="space-y-3 text-sm">
                                                            <div>
                                                                <p className="text-gray-600 mb-1">Payment Status</p>
                                                                <select
                                                                    value={order.paymentInfo?.paymentStatus}
                                                                    onChange={(e) => handlePaymentStatusUpdate(order._id, e.target.value, e)}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    disabled={updatingOrder === order._id}
                                                                    className="cursor-pointer w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                                >
                                                                    <option value="pending">Pending</option>
                                                                    <option value="verified">Verified</option>
                                                                    <option value="failed">Failed</option>
                                                                </select>
                                                            </div>

                                                            <div className="pt-3 border-t border-gray-200 bg-gray-50 rounded-lg -mx-2 px-3 py-3">
                                                                <div className="grid grid-cols-2 gap-3 mb-3">
                                                                    <div>
                                                                        <p className="text-xs text-gray-600 mb-1">Payment Method</p>
                                                                        <p className="text-sm font-bold text-gray-900">
                                                                            {order.paymentInfo?.paymentMethod || 'bKash/Nagad'}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-gray-600 mb-1">Payment Type</p>
                                                                        <p className="text-sm font-bold text-gray-900">
                                                                            {order.paymentInfo?.advancePaymentType === 'full' ? 'Full Payment' : 'Partial'}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <div className="space-y-2 border-t border-gray-300 pt-2">
                                                                    <div>
                                                                        <p className="text-xs text-gray-600">Sender Number</p>
                                                                        <p className="text-base font-bold text-gray-900">
                                                                            {order.paymentInfo?.senderNumber}
                                                                        </p>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-gray-600">Transaction ID</p>
                                                                        <p className="text-base font-bold text-gray-900">
                                                                            {order.paymentInfo?.transactionId}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="pt-3 border-t border-gray-200">
                                                                <div className="flex justify-between mb-1">
                                                                    <span className="text-gray-600">Advance Paid:</span>
                                                                    <span className="font-semibold text-gray-900">
                                                                        ৳{order.paymentInfo?.advanceAmount?.toFixed(2)}
                                                                    </span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-600">Pay on Delivery:</span>
                                                                    <span className="font-semibold text-gray-900">
                                                                        ৳{order.paymentInfo?.payableOnDelivery?.toFixed(2)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Price Summary */}
                                                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Summary</h3>
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Subtotal:</span>
                                                                <span className="font-medium text-gray-900">৳{order.pricing?.subtotal?.toFixed(2)}</span>
                                                            </div>
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Delivery:</span>
                                                                <span className="font-medium text-gray-900">
                                                                    {order.pricing?.deliveryCharge === 0 ? 'Free' : `৳${order.pricing?.deliveryCharge?.toFixed(2)}`}
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between pt-2 border-t border-gray-200">
                                                                <span className="font-semibold text-gray-900">Total:</span>
                                                                <span className="font-bold text-gray-900">৳{order.pricing?.total?.toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Showing {filteredOrders.length} of {totalOrders} orders
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-sm text-gray-700">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Order_page;