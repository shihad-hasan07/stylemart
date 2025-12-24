'use client'
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Tag, 
  Users,
  Settings,
  Bell,
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Upload,
  ChevronDown,
  X,
  Check,
  Clock
} from 'lucide-react';

export default function AdminPanel() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'products', icon: Package, label: 'Products' },
    { id: 'orders', icon: ShoppingCart, label: 'Orders' },
    { id: 'sales', icon: Tag, label: 'Sales' },
    { id: 'customers', icon: Users, label: 'Customers' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const notifications = [
    { 
      type: 'order', 
      title: 'New Order #12543', 
      message: 'John Doe ordered Performance Hoodie', 
      amount: '৳1,850',
      time: '2 minutes ago',
      unread: true 
    },
    { 
      type: 'stock', 
      title: 'Low Stock Alert', 
      message: 'Slim Fit Cargo Trouser - Only 3 items left', 
      time: '30 minutes ago',
      unread: true 
    },
    { 
      type: 'order', 
      title: 'Order Delivered', 
      message: 'Order #12541 delivered successfully', 
      time: '1 hour ago',
      unread: false 
    },
    { 
      type: 'customer', 
      title: 'New Customer', 
      message: 'Sarah Williams joined', 
      time: '2 hours ago',
      unread: false 
    },
    { 
      type: 'review', 
      title: 'New Product Review', 
      message: 'Mike rated Performance Hoodie - 5 stars', 
      time: '3 hours ago',
      unread: false 
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Matching your site's navy theme */}
      <aside className="w-64 bg-[#0F172A] text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold">StyleMart</h2>
          <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center font-bold">
              MS
            </div>
            <div>
              <p className="text-sm font-semibold">Md. Shihab Hasan</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {menuItems.find(item => item.id === currentPage)?.label}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {currentPage === 'dashboard' && 'Overview of your store performance'}
                {currentPage === 'products' && 'Manage your product inventory'}
                {currentPage === 'orders' && 'Track and manage customer orders'}
                {currentPage === 'sales' && 'Create and manage sales campaigns'}
                {currentPage === 'customers' && 'View and manage customer data'}
                {currentPage === 'settings' && 'Configure your store settings'}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Panel */}
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-[500px] overflow-hidden flex flex-col">
                    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="font-bold text-gray-900">Notifications ({unreadCount})</h3>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto">
                      {notifications.map((notif, idx) => (
                        <div 
                          key={idx} 
                          className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                            notif.unread ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              notif.type === 'order' ? 'bg-green-500' :
                              notif.type === 'stock' ? 'bg-red-500' :
                              notif.type === 'customer' ? 'bg-blue-500' :
                              'bg-yellow-500'
                            }`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-gray-900">{notif.title}</p>
                              <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                              {notif.amount && (
                                <p className="text-sm font-bold text-gray-900 mt-1">{notif.amount}</p>
                              )}
                              <p className="text-xs text-gray-500 mt-2">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="px-4 py-3 border-t border-gray-200 flex gap-2">
                      <button className="flex-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded font-semibold">
                        Mark all as read
                      </button>
                      <button className="flex-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded font-semibold">
                        Clear all
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {currentPage === 'dashboard' && <DashboardContent />}
          {currentPage === 'products' && <ProductsContent />}
          {currentPage === 'orders' && <OrdersContent />}
          {currentPage === 'sales' && <SalesContent />}
          {currentPage === 'customers' && <CustomersContent />}
          {currentPage === 'settings' && <SettingsContent />}
        </main>
      </div>
    </div>
  );
}

// Dashboard Page
function DashboardContent() {
  const stats = [
    { label: 'Total Revenue', value: '৳2,45,680', change: '+12.5%', up: true, icon: DollarSign },
    { label: 'Orders', value: '156', change: '+8.2%', up: true, icon: ShoppingCart },
    { label: 'Products', value: '324', change: '-2.4%', up: false, icon: Package },
    { label: 'Customers', value: '1,240', change: '+15.3%', up: true, icon: Users },
  ];

  const recentOrders = [
    { id: '#12543', customer: 'John Doe', product: 'Performance Hoodie', amount: '৳1,850', status: 'Pending', date: 'Dec 20, 2025' },
    { id: '#12542', customer: 'Jane Smith', product: 'Classic Denim Jacket', amount: '৳2,200', status: 'Completed', date: 'Dec 20, 2025' },
    { id: '#12541', customer: 'Mike Johnson', product: 'Cargo Trouser', amount: '৳1,700', status: 'Processing', date: 'Dec 19, 2025' },
    { id: '#12540', customer: 'Sarah Williams', product: 'Puffer Coat', amount: '৳3,400', status: 'Completed', date: 'Dec 19, 2025' },
  ];

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon className="text-gray-700" size={24} />
                </div>
                <span className={`text-sm font-semibold flex items-center gap-1 ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.up ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="text-orange-600" size={24} />
            <h3 className="text-lg font-bold text-orange-900">Pending Orders</h3>
          </div>
          <p className="text-4xl font-bold text-orange-600 mb-3">12</p>
          <button className="text-sm text-orange-700 font-semibold hover:underline">
            View all pending orders →
          </button>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <Package className="text-red-600" size={24} />
            <h3 className="text-lg font-bold text-red-900">Low Stock Alert</h3>
          </div>
          <p className="text-4xl font-bold text-red-600 mb-3">8</p>
          <button className="text-sm text-red-700 font-semibold hover:underline">
            View products →
          </button>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
          <button className="text-sm text-red-500 font-semibold hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.product}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Products Page
function ProductsContent() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  
  const products = [
    { id: 1, name: 'Performance Athletic Hoodie', category: 'Clothing', price: '৳1,850', stock: 12, status: 'In Stock', image: '🎽' },
    { id: 2, name: 'Classic Denim Jacket', category: 'Outerwear', price: '৳2,200', stock: 8, status: 'In Stock', image: '🧥' },
    { id: 3, name: 'Slim Fit Cargo Trouser', category: 'Cargo Trouser', price: '৳1,700', stock: 3, status: 'Low Stock', image: '👖' },
    { id: 4, name: 'Quilted Puffer Coat', category: 'Outerwear', price: '৳3,400', stock: 15, status: 'In Stock', image: '🧥' },
    { id: 5, name: 'Soft Knit Cardigan', category: 'Clothing', price: '৳1,700', stock: 0, status: 'Out of Stock', image: '🎽' },
  ];

  if (showAddProduct) {
    return <AddProductForm onBack={() => setShowAddProduct(false)} />;
  }

  return (
    <div>
      {/* Action Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={18} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download size={18} />
              Export
            </button>
          </div>
          <button 
            onClick={() => setShowAddProduct(true)}
            className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">All Products (324)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-2xl">
                        {product.image}
                      </div>
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{product.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                      product.status === 'In Stock' ? 'bg-green-100 text-green-700' :
                      product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded" title="View">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Edit">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Add Product Form Component
function AddProductForm({ onBack }) {
  const [variations, setVariations] = useState([{ attribute: 'Color', options: [''] }]);
  const [images, setImages] = useState([]);

  const addVariation = () => {
    setVariations([...variations, { attribute: '', options: [''] }]);
  };

  const addOption = (varIdx) => {
    const newVariations = [...variations];
    newVariations[varIdx].options.push('');
    setVariations(newVariations);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronDown size={20} className="rotate-90" />
          </button>
          <h3 className="text-lg font-bold text-gray-900">Add New Product</h3>
        </div>
        <div className="flex gap-3">
          <button onClick={onBack} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold">
            Cancel
          </button>
          <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold">
            Publish Product
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-900">Basic Information</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
              <input 
                type="text"
                placeholder="e.g. Classic Denim Jacket"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Brand *</label>
              <input 
                type="text"
                placeholder="e.g. Urban Edge"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">SKU *</label>
              <input 
                type="text"
                placeholder="e.g. URB-EDG-DJ-LB-M"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Slug *</label>
              <input 
                type="text"
                placeholder="e.g. classic-denim-jacket"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description *</label>
            <textarea 
              rows={2}
              placeholder="A brief one-line description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Description *</label>
            <textarea 
              rows={5}
              placeholder="Detailed product description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-4 border-t border-gray-200 pt-6">
          <h4 className="font-bold text-gray-900">Pricing & Stock</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price (৳) *</label>
              <input 
                type="number"
                placeholder="2800"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity *</label>
              <input 
                type="number"
                placeholder="28"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Status</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                <option>In Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sale Settings */}
        <div className="space-y-4 border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-gray-900">Sale Settings</h4>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              <span className="ml-3 text-sm font-medium text-gray-700">Active Sale</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sale Price (৳)</label>
              <input 
                type="number"
                placeholder="2200"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sale Ends</label>
              <input 
                type="datetime-local"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4 border-t border-gray-200 pt-6">
          <h4 className="font-bold text-gray-900">Categories & Tags</h4>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Categories *</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {['Men', 'Women', 'Kids', 'Clothing', 'Outerwear', 'Accessories', 'Cargo Trouser', 'Wallets'].map(cat => (
                <label key={cat} className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" className="rounded text-red-500 focus:ring-red-500" />
                  <span className="text-sm text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (comma separated)</label>
            <input 
              type="text"
              placeholder="denim, jacket, casual, layering"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Product Images */}
        <div className="space-y-4 border-t border-gray-200 pt-6">
          <h4 className="font-bold text-gray-900">Product Images</h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, idx) => (
              <div key={idx} className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-red-500 cursor-pointer group">
                <Upload className="text-gray-400 group-hover:text-red-500 mb-2" size={32} />
                <p className="text-sm text-gray-500">Upload Image</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP</p>
              </div>
            ))}
          </div>
        </div>

        {/* Variations */}
        <div className="space-y-4 border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-gray-900">Product Variations</h4>
            <button 
              onClick={addVariation}
              className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Plus size={16} />
              Add Variation
            </button>
          </div>

          {variations.map((variation, varIdx) => (
            <div key={varIdx} className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Attribute Name</label>
                  <input 
                    type="text"
                    defaultValue={variation.attribute}
                    placeholder="e.g. Color, Size"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <button className="mt-6 p-2 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Options</label>
                {variation.options.map((opt, optIdx) => (
                  <div key={optIdx} className="flex items-center gap-2">
                    <input 
                      type="text"
                      defaultValue={opt}
                      placeholder={`Option ${optIdx + 1}`}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded">
                      <X size={18} />
                    </button>
                  </div>
                ))}
                <button 
                  onClick={() => addOption(varIdx)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  + Add Option
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <button onClick={onBack} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold">
            Cancel
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold">
            Save as Draft
          </button>
          <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold">
            Publish Product
          </button>
        </div>
      </div>
    </div>
  );
}

// Orders Page
function OrdersContent() {
  const orders = [
    { 
      id: '#12543', 
      customer: 'John Doe', 
      email: 'john@example.com',
      products: ['Performance Athletic Hoodie', 'Slim Fit Cargo Trouser'], 
      total: '৳4,150', 
      payment: 'bKash',
      status: 'Pending',
      date: 'Dec 20, 2025' 
    },
    { 
      id: '#12542', 
      customer: 'Jane Smith', 
      email: 'jane@example.com',
      products: ['Classic Denim Jacket'], 
      total: '৳2,200', 
      payment: 'COD',
      status: 'Completed',
      date: 'Dec 20, 2025' 
    },
    { 
      id: '#12541', 
      customer: 'Mike Johnson', 
      email: 'mike@example.com',
      products: ['Waterproof Rain Jacket', 'Genuine Leather Wallet'], 
      total: '৳4,450', 
      payment: 'Nagad',
      status: 'Processing',
      date: 'Dec 19, 2025' 
    },
  ];

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
              <option>All Status</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
              <option>All Payment Methods</option>
              <option>COD</option>
              <option>bKash</option>
              <option>Nagad</option>
            </select>
            <input 
              type="date"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download size={18} />
            Export Orders
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">All Orders (156)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Products</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                      <p className="text-xs text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">
                      {order.products.map((p, i) => (
                        <div key={i} className="truncate max-w-xs">{p}</div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.total}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.payment}</td>
                  <td className="px-6 py-4">
                    <select 
                      defaultValue={order.status}
                      className={`text-xs font-semibold rounded px-2 py-1 border-0 ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="View Details">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Sales Page
function SalesContent() {
  const [showCreateSale, setShowCreateSale] = useState(false);

  const activeSales = [
    { 
      id: 1,
      name: 'Winter Sale 2024', 
      discount: '21%', 
      products: 8, 
      starts: 'Nov 15, 2025',
      ends: 'Dec 25, 2025',
      status: 'Active'
    },
    { 
      id: 2,
      name: 'Flash Sale - Hoodies', 
      discount: '19%', 
      products: 3, 
      starts: 'Dec 20, 2025',
      ends: 'Dec 01, 2025',
      status: 'Active'
    },
    { 
      id: 3,
      name: 'Denim Jackets Sale', 
      discount: '27%', 
      products: 2, 
      starts: 'Nov 25, 2025',
      ends: 'Nov 25, 2025',
      status: 'Expired'
    },
  ];

  if (showCreateSale) {
    return <CreateSaleForm onBack={() => setShowCreateSale(false)} />;
  }

  return (
    <div>
      {/* Action Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
              <option>All Sales</option>
              <option>Active</option>
              <option>Scheduled</option>
              <option>Expired</option>
            </select>
          </div>
          <button 
            onClick={() => setShowCreateSale(true)}
            className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold"
          >
            <Plus size={18} />
            Create Sale
          </button>
        </div>
      </div>

      {/* Sales Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeSales.map((sale) => (
          <div key={sale.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition">
            <div className={`p-4 ${sale.status === 'Active' ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gray-400'}`}>
              <div className="flex items-center justify-between text-white mb-2">
                <span className="text-sm font-semibold uppercase">{sale.status}</span>
                <Tag size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">{sale.name}</h3>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Discount</span>
                <span className="text-2xl font-bold text-red-600">{sale.discount}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Products</span>
                <span className="font-semibold text-gray-900">{sale.products} items</span>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Starts:</span>
                  <span className="font-medium text-gray-900">{sale.starts}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Ends:</span>
                  <span className="font-medium text-gray-900">{sale.ends}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button className="flex-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-semibold">
                  Edit
                </button>
                <button className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-semibold">
                  {sale.status === 'Active' ? 'End Sale' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Create Sale Form Component
function CreateSaleForm({ onBack }) {
  const allProducts = [
    'Classic Denim Jacket',
    'Performance Athletic Hoodie',
    'Slim Fit Cargo Trouser',
    'Waterproof Rain Jacket',
    'Quilted Puffer Coat',
    'Soft Knit Cardigan',
    'High-Waisted Skinny Jeans',
    'Silk Blend Blouse',
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronDown size={20} className="rotate-90" />
          </button>
          <h3 className="text-lg font-bold text-gray-900">Create Sale Campaign</h3>
        </div>
        <div className="flex gap-3">
          <button onClick={onBack} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold">
            Cancel
          </button>
          <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold">
            Create Sale
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Sale Details */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-900">Sale Details</h4>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sale Name *</label>
            <input 
              type="text"
              placeholder="e.g. Winter Sale 2024"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Discount Type</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                <option>Percentage (%)</option>
                <option>Fixed Amount (৳)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Discount Value *</label>
              <input 
                type="number"
                placeholder="e.g. 20"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date & Time *</label>
              <input 
                type="datetime-local"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">End Date & Time *</label>
              <input 
                type="datetime-local"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </div>

        {/* Select Products */}
        <div className="space-y-4 border-t border-gray-200 pt-6">
          <h4 className="font-bold text-gray-900">Select Products</h4>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="border border-gray-200 rounded-lg max-h-96 overflow-y-auto">
            {allProducts.map((product, idx) => (
              <label key={idx} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                <input type="checkbox" className="rounded text-red-500 focus:ring-red-500" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{product}</p>
                  <p className="text-sm text-gray-500">৳2,200</p>
                </div>
                <span className="text-xs text-gray-500">Stock: 28</span>
              </label>
            ))}
          </div>

          <p className="text-sm text-gray-600">
            <Check className="inline mr-1" size={16} />
            0 products selected
          </p>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <button onClick={onBack} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold">
            Cancel
          </button>
          <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold">
            Create Sale
          </button>
        </div>
      </div>
    </div>
  );
}

// Customers Page
function CustomersContent() {
  const customers = [
    { 
      id: 1,
      name: 'John Doe', 
      email: 'john@example.com',
      phone: '01712345678',
      orders: 5, 
      totalSpent: '৳12,450',
      lastOrder: 'Dec 20, 2025',
      status: 'Active'
    },
    { 
      id: 2,
      name: 'Jane Smith', 
      email: 'jane@example.com',
      phone: '01798765432',
      orders: 12, 
      totalSpent: '৳28,900',
      lastOrder: 'Dec 20, 2025',
      status: 'Active'
    },
    { 
      id: 3,
      name: 'Mike Johnson', 
      email: 'mike@example.com',
      phone: '01656789012',
      orders: 3, 
      totalSpent: '৳8,200',
      lastOrder: 'Dec 19, 2025',
      status: 'Active'
    },
    { 
      id: 4,
      name: 'Sarah Williams', 
      email: 'sarah@example.com',
      phone: '01534567890',
      orders: 8, 
      totalSpent: '৳19,650',
      lastOrder: 'Dec 18, 2025',
      status: 'Inactive'
    },
  ];

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600 text-sm mb-1">Total Customers</p>
          <p className="text-3xl font-bold text-gray-900">1,240</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600 text-sm mb-1">Active Customers</p>
          <p className="text-3xl font-bold text-green-600">1,089</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600 text-sm mb-1">New This Month</p>
          <p className="text-3xl font-bold text-blue-600">156</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-600 text-sm mb-1">Avg Order Value</p>
          <p className="text-3xl font-bold text-purple-600">৳3,250</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by name, email, or phone..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Customer List</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Last Order</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{customer.phone}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{customer.orders}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{customer.totalSpent}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.lastOrder}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                      customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="View Orders">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Settings Page
function SettingsContent() {
  const [activeTab, setActiveTab] = useState('store');

  const tabs = [
    { id: 'store', label: 'Store Info' },
    { id: 'payment', label: 'Payment' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'admins', label: 'Admin Users' },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-500'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'store' && <StoreSettings />}
          {activeTab === 'payment' && <PaymentSettings />}
          {activeTab === 'shipping' && <ShippingSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'admins' && <AdminUsersSettings />}
        </div>
      </div>
    </div>
  );
}

function StoreSettings() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Store Name</label>
          <input 
            type="text"
            defaultValue="StyleMart"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Email</label>
          <input 
            type="email"
            defaultValue="support@stylemart.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Phone</label>
          <input 
            type="tel"
            defaultValue="01701896895"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
            <option>BDT (৳)</option>
            <option>USD ($)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Store Address</label>
        <textarea 
          rows={3}
          defaultValue="Dhaka, Bangladesh"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Store Logo</label>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
            <span className="text-3xl">📷</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">
            <Upload size={18} />
            Upload Logo
          </button>
        </div>
      </div>

      <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold">
        Save Changes
      </button>
    </div>
  );
}

function PaymentSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Payment Methods</h3>
      
      {[
        { name: 'Cash on Delivery (COD)', enabled: true },
        { name: 'bKash', enabled: true },
        { name: 'Nagad', enabled: true },
        { name: 'Rocket', enabled: false },
        { name: 'Bank Transfer', enabled: false },
      ].map((method, idx) => (
        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div>
            <p className="font-semibold text-gray-900">{method.name}</p>
            <p className="text-sm text-gray-600">Accept payments via {method.name}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked={method.enabled} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
          </label>
        </div>
      ))}

      <div className="border-t border-gray-200 pt-6">
        <h4 className="font-bold text-gray-900 mb-3">bKash Configuration</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Merchant Number</label>
            <input 
              type="text"
              placeholder="01XXXXXXXXX"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Instructions</label>
            <textarea 
              rows={3}
              placeholder="Instructions for customers..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold">
        Save Payment Settings
      </button>
    </div>
  );
}

function ShippingSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Shipping Rates</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Inside Dhaka</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">৳</span>
            <input 
              type="number"
              defaultValue="60"
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Outside Dhaka</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">৳</span>
            <input 
              type="number"
              defaultValue="120"
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Free Shipping Above</label>
        <div className="relative max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">৳</span>
          <input 
            type="number"
            defaultValue="2000"
            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Time</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Inside Dhaka</label>
            <input 
              type="text"
              defaultValue="1-2 days"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Outside Dhaka</label>
            <input 
              type="text"
              defaultValue="3-5 days"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold">
        Save Shipping Settings
      </button>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Email Notifications</h3>
      
      {[
        { label: 'Order Confirmation Email', desc: 'Send email when order is placed', enabled: true },
        { label: 'Order Shipped Email', desc: 'Send email when order is shipped', enabled: true },
        { label: 'Order Delivered Email', desc: 'Send email when order is delivered', enabled: true },
        { label: 'Welcome Email', desc: 'Send email to new customers', enabled: true },
      ].map((notif, idx) => (
        <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div>
            <p className="font-semibold text-gray-900">{notif.label}</p>
            <p className="text-sm text-gray-600">{notif.desc}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked={notif.enabled} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
          </label>
        </div>
      ))}

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">SMS Notifications</h3>
        
        {[
          { label: 'Order Confirmation SMS', desc: 'Send SMS when order is placed', enabled: false },
          { label: 'Delivery SMS', desc: 'Send SMS when order is delivered', enabled: false },
        ].map((notif, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
            <div>
              <p className="font-semibold text-gray-900">{notif.label}</p>
              <p className="text-sm text-gray-600">{notif.desc}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked={notif.enabled} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
            </label>
          </div>
        ))}
      </div>

      <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold">
        Save Notification Settings
      </button>
    </div>
  );
}

function AdminUsersSettings() {
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  
  const admins = [
    { name: 'Md. Shihab Hasan', email: 'shihab@stylemart.com', role: 'Owner', status: 'Active' },
    { name: 'Staff Member 1', email: 'staff1@stylemart.com', role: 'Manager', status: 'Active' },
    { name: 'Staff Member 2', email: 'staff2@stylemart.com', role: 'Staff', status: 'Inactive' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Admin Users</h3>
        <button 
          onClick={() => setShowAddAdmin(!showAddAdmin)}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold"
        >
          <Plus size={18} />
          Add Admin
        </button>
      </div>

      {showAddAdmin && (
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-bold text-gray-900 mb-4">Add New Admin User</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text"
                  placeholder="Enter name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input 
                  type="email"
                  placeholder="admin@stylemart.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input 
                  type="password"
                  placeholder="Create password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                  <option>Owner (Full Access)</option>
                  <option>Manager</option>
                  <option>Staff</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Permissions</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Dashboard', 'Products', 'Orders', 'Sales', 'Customers', 'Settings'].map(perm => (
                  <label key={perm} className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded text-red-500 focus:ring-red-500" />
                    <span className="text-sm text-gray-700">{perm}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold">
                Add Admin
              </button>
              <button 
                onClick={() => setShowAddAdmin(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {admins.map((admin, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{admin.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{admin.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{admin.role}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                    admin.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {admin.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Edit">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}