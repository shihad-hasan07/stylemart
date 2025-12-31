'use client'
import React, { useState, useEffect, useContext } from 'react';
import { Upload, X, Edit2, Trash2, Plus, Facebook, Instagram, Youtube, Save, AlertCircle, User } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { allContext } from '@/Auth/Authprovider';
import Routes_heading_texts from '../../components/shared/Routes_heading_texts';

const AdminSettingsPanel = () => {
    const axiosSecure = useAxiosSecure();
    const { userfromDB } = useContext(allContext);
    const [activeTab, setActiveTab] = useState('store');
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // Store Info State
    const [storeInfo, setStoreInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        currency: 'BDT',
        logo: null,
        socialLinks: {
            facebook: '',
            instagram: '',
            youtube: ''
        }
    });

    // Payment Config State
    const [paymentConfig, setPaymentConfig] = useState({
        bkashMerchant: '',
        nagadMerchant: '',
        instructions: ''
    });

    // Admin Users State
    const [adminUsers, setAdminUsers] = useState([]);

    // New Admin Form State
    const [newAdmin, setNewAdmin] = useState({
        email: '',
        role: 'staff'
    });

    // Role Permissions
    const rolePermissions = {
        admin: ['Dashboard', 'Sales', 'Products', 'Customers', 'Orders', 'Settings'],
        manager: ['Dashboard', 'Sales', 'Products', 'Customers', 'Orders'],
        staff: ['Dashboard', 'Products', 'Orders']
    };

    // Role mapping for display
    const getRoleDisplay = (role) => {
        if (role === 'admin') return 'Owner';
        return role.charAt(0).toUpperCase() + role.slice(1);
    };

    // Load data on mount
    useEffect(() => {
        loadStoreInfo();
        loadPaymentConfig();
        loadAdminUsers();
    }, []);

    const loadStoreInfo = async () => {
        try {
            const res = await axiosSecure.get('/settings/store');
            const data = res.data?.data || res.data;
            setStoreInfo(data);
        } catch (error) {
            console.error('Error loading store info:', error);
        }
    };

    const loadPaymentConfig = async () => {
        try {
            const response = await axiosSecure.get('/settings/payment');
            const data = response.data?.data || response.data;
            setPaymentConfig(data);
        } catch (error) {
            console.error('Error loading payment config:', error);
        }
    };

    const loadAdminUsers = async () => {
        try {
            const response = await axiosSecure.get('/users/admin/all');
            const data = response.data?.data || response.data;

            // Filter out current logged-in user if they are admin
            let filteredUsers = Array.isArray(data) ? data : [];
            if (userfromDB?.email && userfromDB?.role === 'admin') {
                filteredUsers = filteredUsers.filter(adminUser =>
                    adminUser.email !== userfromDB.email
                );
            }

            setAdminUsers(filteredUsers);
        } catch (error) {
            console.error('Error loading admin users:', error);
        }
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size should be less than 5MB');
            return;
        }

        setStoreInfo(prev => ({
            ...prev,
            logo: file
        }));
    };

    const handleRemoveLogo = () => {
        setStoreInfo(prev => ({
            ...prev,
            logo: null
        }));
    };

    const handleSaveStoreInfo = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', storeInfo.name);
            formData.append('email', storeInfo.email);
            formData.append('phone', storeInfo.phone);
            formData.append('address', storeInfo.address);
            formData.append('currency', storeInfo.currency);
            formData.append('facebook', storeInfo.socialLinks.facebook);
            formData.append('instagram', storeInfo.socialLinks.instagram);
            formData.append('youtube', storeInfo.socialLinks.youtube);

            if (storeInfo.logo instanceof File) {
                formData.append('logo', storeInfo.logo);
            }

            await axiosSecure.put('/settings/store', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success('Store information updated successfully!');
            loadStoreInfo();
        } catch (error) {
            console.error(error);
            toast.error('Failed to update store information');
        } finally {
            setLoading(false);
        }
    };

    const handleSavePaymentConfig = async () => {
        setLoading(true);
        try {
            await axiosSecure.put('/settings/payment', paymentConfig);
            toast.success('Payment configuration updated successfully!');
            loadPaymentConfig();
        } catch (error) {
            console.error('Error saving payment config:', error);
            toast.error('Failed to update payment configuration');
        } finally {
            setLoading(false);
        }
    };

    const handleAddAdmin = async () => {
        if (!newAdmin.email) {
            toast.error('Please enter an email address');
            return;
        }

        setLoading(true);
        try {
            const response = await axiosSecure.post('/users/admin/users', newAdmin);
            const data = response.data?.data || response.data;

            setAdminUsers([...adminUsers, data]);
            setNewAdmin({ email: '', role: 'staff' });
            setShowAddAdminModal(false);
            toast.success('Admin added successfully!');
        } catch (error) {
            console.error('Error adding admin:', error);
            toast.error(error.response?.data?.message || 'Failed to add admin');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAdmin = async (id, userName) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            html: `Do you want to delete <strong>${userName}</strong>?<br/><small class="text-gray-500">They will be converted to a regular user.</small>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            setLoading(true);
            try {
                await axiosSecure.delete(`/users/admin/users/${id}`);
                setAdminUsers(adminUsers.filter(u => (u.id || u._id) !== id));

                Swal.fire({
                    title: 'Deleted!',
                    text: 'Admin has been deleted and converted to user.',
                    icon: 'success',
                    confirmButtonColor: '#ef4444',
                    timer: 2000
                });
            } catch (error) {
                console.error('Error deleting admin:', error);
                toast.error('Failed to delete admin');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEditAdmin = async (id, currentRole, userName) => {
        const { value: newRole } = await Swal.fire({
            title: `Change role for ${userName}`,
            input: 'select',
            inputOptions: {
                admin: 'Owner (Full Access)',
                manager: 'Manager',
                staff: 'Staff'
            },
            inputValue: currentRole,
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Update Role',
            inputValidator: (value) => {
                if (!value) {
                    return 'Please select a role!';
                }
            }
        });

        if (newRole) {
            setLoading(true);
            try {
                await axiosSecure.patch(`/users/admin/users/${id}`, { role: newRole });

                setAdminUsers(adminUsers.map(u =>
                    (u.id || u._id) === id ? { ...u, role: newRole } : u
                ));

                toast.success('Role updated successfully!');
            } catch (error) {
                console.error('Error updating role:', error);
                toast.error('Failed to update role');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="">
            <Routes_heading_texts name={'settings'} />
            <div className='px-6 m-5 bg-white rounded-xl py-5'>

                {/* Tabs */}
                <div className="bg-white rounded-xl overflow-hidden">
                    <div className="flex border-b border-gray-400">
                        <button
                            onClick={() => setActiveTab('store')}
                            className={`px-8 py-4 cursor-pointer font-semibold transition-all relative ${activeTab === 'store'
                                ? 'text-red-600 bg-red-50'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Store Info
                            {activeTab === 'store' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('payment')}
                            className={`px-8 cursor-pointer py-4 font-semibold transition-all relative ${activeTab === 'payment'
                                ? 'text-red-600 bg-red-50'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Payment
                            {activeTab === 'payment' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('admin')}
                            className={`px-8 py-4 cursor-pointer font-semibold transition-all relative ${activeTab === 'admin'
                                ? 'text-red-600 bg-red-50'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            Admin Users
                            {activeTab === 'admin' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
                            )}
                        </button>
                    </div>
                </div>

                {/* Store Info Tab */}
                {activeTab === 'store' && (
                    <div className="bg-white rounded-xl p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-red-500 rounded"></div>
                            Store Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Store Name *
                                </label>
                                <input
                                    type="text"
                                    value={storeInfo.name}
                                    onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    placeholder="Enter store name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Contact Email *
                                </label>
                                <input
                                    type="email"
                                    value={storeInfo.email}
                                    onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    placeholder="store@example.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Contact Phone *
                                </label>
                                <input
                                    type="text"
                                    value={storeInfo.phone}
                                    onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    placeholder="+880 1XXX-XXXXXX"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Currency
                                </label>
                                <select
                                    value={storeInfo.currency}
                                    onChange={(e) => setStoreInfo({ ...storeInfo, currency: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                >
                                    <option>BDT (৳)</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Store Address
                            </label>
                            <textarea
                                value={storeInfo.address}
                                onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
                                rows="3"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                placeholder="Enter complete address"
                            />
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Store Logo
                            </label>
                            <div className="flex items-start gap-6">
                                <div className="relative group">
                                    <div className="w-40 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 group-hover:border-red-500 transition-all">
                                        {storeInfo.logo ? (
                                            <>
                                                <img
                                                    src={
                                                        storeInfo.logo instanceof File
                                                            ? URL.createObjectURL(storeInfo.logo)
                                                            : storeInfo.logo
                                                    }
                                                    alt="Logo"
                                                    className="object-contain h-full w-full"
                                                />
                                                <button
                                                    onClick={handleRemoveLogo}
                                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </>
                                        ) : (
                                            <div className="text-center">
                                                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                                <p className="text-xs text-gray-500">No logo</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <label className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg cursor-pointer hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg">
                                        <Upload className="w-5 h-5" />
                                        <span className="font-semibold">Upload Logo</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoUpload}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="text-sm text-gray-600 mt-3">
                                        Recommended: Square image, at least 500x500px
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Max file size: 5MB • Formats: JPG, PNG, SVG
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links Section */}
                        <div className="border-t pt-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-red-500 rounded"></div>
                                Social Media Links
                            </h3>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <div className="flex items-center gap-2">
                                            <Facebook className="w-5 h-5 text-blue-600" />
                                            Facebook Page URL
                                        </div>
                                    </label>
                                    <input
                                        type="url"
                                        value={storeInfo.socialLinks?.facebook || ''}
                                        onChange={(e) => setStoreInfo({
                                            ...storeInfo,
                                            socialLinks: { ...storeInfo.socialLinks, facebook: e.target.value }
                                        })}
                                        placeholder="https://facebook.com/yourpage"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <div className="flex items-center gap-2">
                                            <Instagram className="w-5 h-5 text-pink-600" />
                                            Instagram Profile URL
                                        </div>
                                    </label>
                                    <input
                                        type="url"
                                        value={storeInfo.socialLinks?.instagram || ''}
                                        onChange={(e) => setStoreInfo({
                                            ...storeInfo,
                                            socialLinks: { ...storeInfo.socialLinks, instagram: e.target.value }
                                        })}
                                        placeholder="https://instagram.com/yourprofile"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <div className="flex items-center gap-2">
                                            <Youtube className="w-5 h-5 text-red-600" />
                                            YouTube Channel URL
                                        </div>
                                    </label>
                                    <input
                                        type="url"
                                        value={storeInfo.socialLinks?.youtube || ''}
                                        onChange={(e) => setStoreInfo({
                                            ...storeInfo,
                                            socialLinks: { ...storeInfo.socialLinks, youtube: e.target.value }
                                        })}
                                        placeholder="https://youtube.com/@yourchannel"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={handleSaveStoreInfo}
                                disabled={loading}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save className="w-5 h-5" />
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Payment Configuration Tab */}
                {activeTab === 'payment' && (
                    <div className="bg-white rounded-xl p-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-red-500 rounded"></div>
                            Payment Configuration
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    bKash Merchant Number
                                </label>
                                <input
                                    type="text"
                                    value={paymentConfig.bkashMerchant}
                                    onChange={(e) => setPaymentConfig({ ...paymentConfig, bkashMerchant: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    placeholder="01XXXXXXXXX"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nagad Merchant Number
                                </label>
                                <input
                                    type="text"
                                    value={paymentConfig.nagadMerchant}
                                    onChange={(e) => setPaymentConfig({ ...paymentConfig, nagadMerchant: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    placeholder="01XXXXXXXXX"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Payment Instructions
                                </label>
                                <textarea
                                    value={paymentConfig.instructions}
                                    onChange={(e) => setPaymentConfig({ ...paymentConfig, instructions: e.target.value })}
                                    rows="5"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    placeholder="Enter payment instructions for customers..."
                                />
                            </div>
                        </div>

                        <div className="mt-8">
                            <button
                                onClick={handleSavePaymentConfig}
                                disabled={loading}
                                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Save className="w-5 h-5" />
                                {loading ? 'Saving...' : 'Save Payment Settings'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Admin Users Tab */}
                {activeTab === 'admin' && (
                    <div className="bg-white rounded-xl p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <div className="w-1 h-6 bg-red-500 rounded"></div>
                                Admin Users
                            </h2>
                            <button
                                onClick={() => setShowAddAdminModal(!showAddAdminModal)}
                                disabled={loading}
                                className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Plus className="w-5 h-5" />
                                Add Admin
                            </button>
                        </div>

                        {/* Add Admin Modal */}
                        {showAddAdminModal && (
                            <div className="rounded-xl p-6 mb-6 bg-red-50 border border-gray-300">
                                <h3 className="text-lg font-bold text-gray-900 mb-5">Add New Admin User</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input type="email" value={newAdmin.email}
                                            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                            placeholder="admin@example.com" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Role *
                                        </label>
                                        <select value={newAdmin.role} onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        >
                                            <option value="admin">Owner (Full Access)</option>
                                            <option value="manager">Manager</option>
                                            <option value="staff">Staff</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Permissions for {getRoleDisplay(newAdmin.role)}
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {rolePermissions[newAdmin.role].map((permission) => (
                                            <div key={permission} className="flex items-center gap-2  px-3 py-2 rounded-lg border border-gray-200">
                                                <input
                                                    type="checkbox"
                                                    checked
                                                    readOnly
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <span className="text-sm font-medium text-gray-700">{permission}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleAddAdmin}
                                        disabled={loading}
                                        className="px-6 py-3 cursor-pointer bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400 hover:to-blue-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Adding...' : 'Add Admin'}
                                    </button>

                                    <button
                                        onClick={() => {
                                            setShowAddAdminModal(false);
                                            setNewAdmin({ email: '', role: 'staff' });
                                        }}
                                        disabled={loading}
                                        className="px-6 py-3 cursor-pointer bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Admin Users Table */}
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
                                        <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
                                        <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Role</th>
                                        <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                                        <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {adminUsers.map((adminUser) => (
                                        <tr key={adminUser.id || adminUser._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    {adminUser?.photoURL &&
                                                        adminUser.photoURL !== "null" &&
                                                        adminUser.photoURL !== "" ? (
                                                        <img
                                                            referrerPolicy="no-referrer"
                                                            crossOrigin="anonymous"
                                                            src={adminUser.photoURL}
                                                            alt={adminUser?.name}
                                                            className="w-10 h-10 rounded-full object-cover border-red-200"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                                                            {adminUser?.name?.charAt(0)?.toUpperCase() || "A"}
                                                        </div>
                                                    )}

                                                    <span className="text-sm font-semibold text-gray-900">{adminUser.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-gray-600">{adminUser.email}</td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${adminUser.role === 'admin'
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : adminUser.role === 'manager'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-green-100 text-green-700'
                                                    }`}>
                                                    {getRoleDisplay(adminUser.role)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${adminUser.status === 'active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {adminUser.status?.charAt(0).toUpperCase() + adminUser.status?.slice(1) || 'Active'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleEditAdmin(adminUser.id || adminUser._id, adminUser.role, adminUser.name)}
                                                        disabled={loading}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                        title="Edit role"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteAdmin(adminUser.id || adminUser._id, adminUser.name)}
                                                        disabled={loading}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                        title="Delete admin"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {adminUsers.length === 0 && (
                                <div className="text-center py-12">
                                    <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-600 font-semibold">No admin users found</p>
                                    <p className="text-sm text-gray-500 mt-1">Add your first admin user above.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminSettingsPanel;