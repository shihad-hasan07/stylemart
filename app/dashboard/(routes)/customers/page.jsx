'use client'
import { useState, useEffect } from 'react';
import { Search, Eye, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Routes_heading_texts from '../../components/shared/Routes_heading_texts';

const CustomersPage = () => {
    const axiosSecure = useAxiosSecure();

    const [customers, setCustomers] = useState([]);
    const [allCustomers, setAllCustomers] = useState([]); // Store all customers
    const [summary, setSummary] = useState({
        totalCustomers: 0,
        activeCustomers: 0,
        newThisMonth: 0,
        avgOrderValue: 0
    });
    const [loading, setLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Fetch customers
    useEffect(() => {
        fetchCustomers();
    }, [statusFilter]);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (statusFilter !== 'all') params.append('status', statusFilter);

            const res = await axiosSecure.get(`/users/customers?${params.toString()}`);

            if (res.data.success) {
                setCustomers(res.data.data.customers);
                setAllCustomers(res.data.data.customers); // Store all customers
                setSummary(res.data.data.summary);

                // Calculate average order value
                const totalSpent = res.data.data.customers.reduce((sum, c) => sum + c.orderStats.totalSpent, 0);
                const totalOrders = res.data.data.customers.reduce((sum, c) => sum + c.orderStats.totalOrders, 0);
                setSummary(prev => ({
                    ...prev,
                    avgOrderValue: totalOrders > 0 ? Math.round(totalSpent / totalOrders) : 0
                }));
            }
        } catch (error) {
            toast.error('Failed to fetch customers');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Search handler with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery) {
                searchCustomers();
            } else {
                // If search is cleared, show all customers without refetching
                setCustomers(allCustomers);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const searchCustomers = async () => {
        try {
            setSearchLoading(true);
            const params = new URLSearchParams();
            params.append('search', searchQuery);
            if (statusFilter !== 'all') params.append('status', statusFilter);

            const res = await axiosSecure.get(`/users/customers?${params.toString()}`);

            if (res.data.success) {
                setCustomers(res.data.data.customers);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSearchLoading(false);
        }
    };

    // Copy to clipboard
    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        toast.success(`${type} copied to clipboard`);
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Get avatar initials
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Avatar colors
    const avatarColors = [
        'bg-blue-500',
        'bg-purple-500',
        'bg-green-500',
        'bg-yellow-500',
        'bg-red-500',
        'bg-indigo-500',
        'bg-pink-500'
    ];

    const getAvatarColor = (name) => {
        const index = name.charCodeAt(0) % avatarColors.length;
        return avatarColors[index];
    };

    if (loading) {
        return (
            <div>
                <Routes_heading_texts name={'customers'} total={summary.totalCustomers.toLocaleString()} />
                <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                                <div className="h-8 bg-gray-200 rounded w-32"></div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                        <div className="h-10 bg-gray-200 rounded mb-4"></div>
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="h-16 bg-gray-100 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Routes_heading_texts name={'customers'} total={summary.totalCustomers.toLocaleString()} />
            <div className="p-4 sm:p-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2">Total Customers</p>
                        <p className="text-3xl font-bold text-gray-900">{summary.totalCustomers.toLocaleString()}</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2">Active Customers</p>
                        <p className="text-3xl font-bold text-green-600">{summary.activeCustomers.toLocaleString()}</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2">New This Month</p>
                        <p className="text-3xl font-bold text-blue-600">{summary.newThisMonth}</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <p className="text-sm text-gray-600 mb-2">Avg Order Value</p>
                        <p className="text-3xl font-bold text-purple-600">৳{summary.avgOrderValue.toLocaleString()}</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-sm">
                    {/* Search & Filter Bar */}
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                {searchLoading ? (
                                    <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 animate-spin" />
                                ) : (
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                )}
                                <input
                                    type="text"
                                    placeholder="Search by name, email, or phone..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Status Filter */}
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Table Header */}
                    <div className="hidden lg:block px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 uppercase">
                            <div className="col-span-3">Customer</div>
                            <div className="col-span-2">Contact</div>
                            <div className="col-span-1 text-center">Orders</div>
                            <div className="col-span-2 text-right">Total Spent</div>
                            <div className="col-span-2">Last Order</div>
                            <div className="col-span-1 text-center">Status</div>
                            <div className="col-span-1 text-center">Actions</div>
                        </div>
                    </div>

                    {/* Customer List */}
                    <div className="divide-y divide-gray-200">
                        {customers.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">
                                <p className="text-lg font-medium mb-2">No customers found</p>
                                <p className="text-sm">Try adjusting your search or filter criteria</p>
                            </div>
                        ) : (
                            customers.map((customer) => (
                                <div key={customer._id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                                    {/* Desktop View */}
                                    <div className="hidden lg:grid grid-cols-12 gap-4 items-center">
                                        {/* Customer */}
                                        <div className="col-span-3 flex items-center gap-3">
                                            {customer.photoURL ? (
                                                <img referrerPolicy="no-referrer" crossOrigin="anonymous" loading="lazy"
                                                    src={customer.photoURL}
                                                    alt={customer.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className={`w-10 h-10 rounded-full ${getAvatarColor(customer.name)} flex items-center justify-center text-white font-semibold text-sm`}>
                                                    {getInitials(customer.name)}
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="font-medium text-gray-900 truncate">{customer.name}</p>
                                                <p className="text-sm text-gray-500 truncate">{customer.email}</p>
                                            </div>
                                        </div>

                                        {/* Contact */}
                                        <div className="col-span-2">
                                            <button
                                                onClick={() => copyToClipboard(customer.phone, 'Phone')}
                                                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                            >
                                                {customer.phone}
                                            </button>
                                        </div>

                                        {/* Orders */}
                                        <div className="col-span-1 text-center">
                                            <span className="font-semibold text-gray-900">{customer.orderStats.totalOrders}</span>
                                        </div>

                                        {/* Total Spent */}
                                        <div className="col-span-2 text-right">
                                            <span className="font-semibold text-gray-900">
                                                ৳{customer.orderStats.totalSpent.toLocaleString()}
                                            </span>
                                        </div>

                                        {/* Last Order */}
                                        <div className="col-span-2">
                                            <span className="text-sm text-gray-600">
                                                {formatDate(customer.orderStats.lastOrderDate)}
                                            </span>
                                        </div>

                                        {/* Status */}
                                        <div className="col-span-1 flex justify-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${customer.status === 'active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {customer.status === 'active' ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>

                                        {/* Actions */}
                                        <div className="col-span-1 flex justify-center">
                                            <button
                                                onClick={() => copyToClipboard(customer.email, 'Email')}
                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                title="Copy email"
                                            >
                                                <Eye className="w-5 h-5 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Mobile View */}
                                    <div className="lg:hidden">
                                        <div className="flex items-start gap-3">
                                            {customer.photoURL ? (
                                                <img referrerPolicy="no-referrer" crossOrigin="anonymous" loading="lazy"
                                                    src={customer.photoURL}
                                                    alt={customer.name}
                                                    className="w-12 h-12 rounded-full object-cover shrink-0"
                                                />
                                            ) : (
                                                <div className={`w-12 h-12 rounded-full ${getAvatarColor(customer.name)} flex items-center justify-center text-white font-semibold shrink-0`}>
                                                    {getInitials(customer.name)}
                                                </div>
                                            )}

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <p className="font-medium text-gray-900 truncate">{customer.name}</p>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ml-2 ${customer.status === 'active'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {customer.status === 'active' ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>

                                                <p className="text-sm text-gray-500 truncate mb-1">{customer.email}</p>

                                                <button
                                                    onClick={() => copyToClipboard(customer.phone, 'Phone')}
                                                    className="text-sm text-gray-600 hover:text-blue-600 mb-3"
                                                >
                                                    {customer.phone}
                                                </button>

                                                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-0.5">Orders</p>
                                                        <p className="font-semibold text-gray-900">{customer.orderStats.totalOrders}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-0.5">Spent</p>
                                                        <p className="font-semibold text-gray-900">
                                                            ৳{customer.orderStats.totalSpent.toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 mb-0.5">Last Order</p>
                                                        <p className="text-xs text-gray-600">
                                                            {formatDate(customer.orderStats.lastOrderDate)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination Info */}
                    {customers.length > 0 && (
                        <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-600">
                            Showing {customers.length} customer{customers.length !== 1 ? 's' : ''}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomersPage;