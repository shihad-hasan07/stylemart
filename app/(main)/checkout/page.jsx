"use client";
import { useSelector, useDispatch } from "react-redux";
import { useContext, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { ShoppingBag, MapPin, CreditCard, Phone, Hash, Package, Info, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearCart } from "@/redux/features/addToCart/slice_addtoCart";
import useAxios from "@/hooks/useAxios";
import { toast } from "react-toastify";
import { allContext } from "@/Auth/Authprovider";

export default function CheckoutPage() {
    const { user, userfromDB, loading } = useContext(allContext);
    const dispatch = useDispatch();
    const axiosPublic = useAxios();
    const router = useRouter();
    const { cartProducts, totalPrice } = useSelector((state) => state.cart);
    const [advancePaymentType, setAdvancePaymentType] = useState("partial");
    const [paymentMethod, setPaymentMethod] = useState("bkash");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            phone: "",
            streetAddress: "",
            city: "",
            district: "",
            email: "",
            orderNotes: "",
            senderNumber: "",
            transactionId: ""
        }
    });

    const minimumAdvance = 130;
    const deliveryCharge = 0;
    const total = totalPrice + deliveryCharge;
    const advanceAmount = advancePaymentType === "full" ? total : minimumAdvance;
    const payableOnDelivery = total - advanceAmount;

    const hasRedirected = useRef(false);
    useEffect(() => {
        if (loading) return;

        if (!user && !hasRedirected.current) {
            hasRedirected.current = true;
            router.replace("/login");
            toast.error("Please login to place order");
        }
    }, [loading, user, router]);

    if (!loading && cartProducts.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Your cart is empty
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Add some products to continue
                    </p>
                    <Link href="/shop">
                        <button className="px-6 py-2.5 bg-black text-white font-medium hover:bg-gray-800 transition-colors">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
            </div>
        );
    }

    if (!userfromDB || !userfromDB._id) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Account Error
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Unable to load your account information. Please try logging out and logging back in.
                    </p>
                    <button
                        onClick={() => router.replace("/login")}
                        className="px-6 py-2.5 bg-black text-white font-medium hover:bg-gray-800 transition-colors"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    const onSubmit = async (data) => {
        if (!userfromDB?._id) {
            toast.error("User information not found. Please login again.");
            return;
        }

        setIsSubmitting(true);

        try {
            const orderData = {
                userId: userfromDB._id,
                name: data.name,
                phone: data.phone,
                streetAddress: data.streetAddress,
                city: data.city,
                district: data.district,
                email: data.email || undefined,
                orderNotes: data.orderNotes || undefined,
                advancePaymentType,
                paymentMethod,
                senderNumber: data.senderNumber,
                transactionId: data.transactionId,
                products: cartProducts.map(item => ({
                    productId: item._id,
                    quantity: item.quantity,
                    selectedColor: item.selectedColor || undefined,
                    selectedSize: item.selectedSize || undefined
                })),
                deliveryCharge: 0
            };

            const response = await axiosPublic.post('/orders/create', orderData);

            if (response.data.success) {
                dispatch(clearCart());
                toast.success("Order placed successfully!");
                router.push(`/my-account/orders`);
            }

        } catch (error) {
            console.error('Order submission error:', error);
            const errorMessage = error.response?.data?.message || 'Failed to place order. Please try again.';
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                    <p className="text-gray-600 mt-2">Complete your order</p>
                </div>

                {/* Payment Instructions */}
                <div className="bg-amber-50 border border-amber-200 p-5 mb-8">
                    <div className="flex gap-4">
                        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-3">অর্ডার করার নিয়ম</h3>
                            <div className="space-y-1.5 text-sm text-gray-700">
                                <p>• অর্ডার confirm করতে <strong>minimum ১৩০ টাকা</strong> বা <strong>সম্পূর্ণ টাকা</strong> পাঠান</p>
                                <p>• Send Money করার সময় <strong>আপনার নাম</strong> রেফারেন্স হিসেবে লিখুন</p>
                                <p>• <strong>bKash অথবা Nagad</strong> যেকোনো একটি ব্যবহার করতে পারবেন</p>
                                <p>• নিচের ফর্মে <strong>Payment Method, Sender Number</strong> এবং <strong>Transaction ID</strong> দিন</p>
                            </div>

                            <div className="mt-4 bg-white border border-amber-300 p-4">
                                <p className="text-sm text-gray-600 mb-1">পেমেন্ট নাম্বার</p>
                                <p className="text-2xl font-bold text-gray-900">01716500086</p>
                                <p className="text-xs text-gray-500 mt-1">bKash / Nagad - Send Money</p>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Section */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Billing Details */}
                            <div className="border border-gray-200 p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <MapPin className="w-5 h-5 text-gray-700" />
                                    <h2 className="text-lg font-semibold text-gray-900">Delivery Address</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name <span className="text-red-600">*</span>
                                        </label>
                                        <input type="text"
                                            {...register("name", {
                                                required: "Name is required",
                                                minLength: { value: 2, message: "Name must be at least 2 characters" }
                                            })}
                                            disabled={isSubmitting}
                                            className={`w-full px-4 py-2.5 border ${errors.name ? 'border-red-600' : 'border-gray-300'} focus:outline-none focus:border-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                            placeholder="Enter your full name"
                                        />
                                        {errors.name && (
                                            <p className="text-red-600 text-xs mt-1.5">{errors.name.message}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number <span className="text-red-600">*</span>
                                        </label>
                                        <input type="text"
                                            {...register("phone", {
                                                required: "Phone number is required",
                                                pattern: {
                                                    value: /^01[3-9]\d{8}$/,
                                                    message: "Enter valid number (01XXXXXXXXX)"
                                                }
                                            })}
                                            disabled={isSubmitting}
                                            className={`w-full px-4 py-2.5 border ${errors.phone ? 'border-red-600' : 'border-gray-300'} focus:outline-none focus:border-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                            placeholder="01XXXXXXXXX"
                                        />
                                        {errors.phone && (
                                            <p className="text-red-600 text-xs mt-1.5">{errors.phone.message}</p>
                                        )}
                                        <p className="text-xs text-gray-500 mt-1.5">আপনার সাথে যোগাযোগের জন্য</p>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Street Address <span className="text-red-600">*</span>
                                        </label>
                                        <input type="text"
                                            {...register("streetAddress", {
                                                required: "Street address is required",
                                                minLength: { value: 5, message: "Address must be at least 5 characters" }
                                            })}
                                            disabled={isSubmitting}
                                            className={`w-full px-4 py-2.5 border ${errors.streetAddress ? 'border-red-600' : 'border-gray-300'} focus:outline-none focus:border-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                            placeholder="House number and street name"
                                        />
                                        {errors.streetAddress && (
                                            <p className="text-red-600 text-xs mt-1.5">{errors.streetAddress.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City <span className="text-red-600">*</span>
                                        </label>
                                        <input type="text"
                                            {...register("city", {
                                                required: "City is required",
                                                minLength: { value: 2, message: "City must be at least 2 characters" }
                                            })}
                                            disabled={isSubmitting}
                                            className={`w-full px-4 py-2.5 border ${errors.city ? 'border-red-600' : 'border-gray-300'} focus:outline-none focus:border-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                            placeholder="Your city"
                                        />
                                        {errors.city && (
                                            <p className="text-red-600 text-xs mt-1.5">{errors.city.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            District <span className="text-red-600">*</span>
                                        </label>
                                        <input type="text"
                                            {...register("district", {
                                                required: "District is required",
                                                minLength: { value: 2, message: "District must be at least 2 characters" }
                                            })}
                                            disabled={isSubmitting}
                                            className={`w-full px-4 py-2.5 border ${errors.district ? 'border-red-600' : 'border-gray-300'} focus:outline-none focus:border-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                            placeholder="Your district"
                                        />
                                        {errors.district && (
                                            <p className="text-red-600 text-xs mt-1.5">{errors.district.message}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address <span className="text-gray-400 text-xs">(Optional)</span>
                                        </label>
                                        <input type="email"
                                            {...register("email", {
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                            disabled={isSubmitting}
                                            className={`w-full px-4 py-2.5 border ${errors.email ? 'border-red-600' : 'border-gray-300'} focus:outline-none focus:border-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                            placeholder="your@email.com"
                                        />
                                        {errors.email && (
                                            <p className="text-red-600 text-xs mt-1.5">{errors.email.message}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Order Notes <span className="text-gray-400 text-xs">(Optional)</span>
                                        </label>
                                        <textarea
                                            {...register("orderNotes")}
                                            rows="3" disabled={isSubmitting}
                                            className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-900 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            placeholder="Special instructions for delivery"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div className="border border-gray-200 p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <CreditCard className="w-5 h-5 text-gray-700" />
                                    <h2 className="text-lg font-semibold text-gray-900">Payment Information</h2>
                                </div>

                                <div className="space-y-5">
                                    {/* Payment Type */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Choose Payment Option <span className="text-red-600">*</span>
                                        </label>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            {/* Partial Payment */}
                                            <label className={`flex flex-col p-4 border-2 cursor-pointer transition-all ${advancePaymentType === "partial" ? 'border-gray-900 bg-gray-50' : 'border-gray-300 hover:border-gray-400'} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                                <input type="radio" name="advancePaymentType" value="partial"
                                                    checked={advancePaymentType === "partial"}
                                                    onChange={(e) => setAdvancePaymentType(e.target.value)}
                                                    disabled={isSubmitting} className="sr-only"
                                                />
                                                <div className="text-base font-semibold text-gray-900 mb-1">Minimum Advance</div>
                                                <div className="text-2xl font-bold text-gray-900 mb-2">৳130</div>
                                                <p className="text-sm text-gray-600">
                                                    Pay ৳{(total - minimumAdvance).toFixed(2)} on delivery
                                                </p>
                                            </label>

                                            {/* Full Payment */}
                                            <label className={`flex flex-col p-4 border-2 cursor-pointer transition-all ${advancePaymentType === "full" ? 'border-gray-900 bg-gray-50' : 'border-gray-300 hover:border-gray-400'} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                                <input type="radio" name="advancePaymentType" value="full" checked={advancePaymentType === "full"}
                                                    onChange={(e) => setAdvancePaymentType(e.target.value)}
                                                    disabled={isSubmitting} className="sr-only"
                                                />
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-base font-semibold text-gray-900">Full Payment</span>
                                                    <span className="text-xs bg-gray-900 text-white px-2 py-0.5">Recommended</span>
                                                </div>
                                                <div className="text-2xl font-bold text-gray-900 mb-2">৳{total.toFixed(2)}</div>
                                                <p className="text-sm text-gray-600">Nothing to pay on delivery</p>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Payment Method Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Payment Method <span className="text-red-600">*</span>
                                        </label>
                                        <select
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            disabled={isSubmitting}
                                            className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        >
                                            <option value="bkash">bKash</option>
                                            <option value="nagad">Nagad</option>
                                        </select>
                                        <p className="text-xs text-gray-500 mt-1.5">আপনি যে মাধ্যমে পেমেন্ট করেছেন</p>
                                    </div>

                                    {/* Sender Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Sender Mobile Number <span className="text-red-600">*</span>
                                        </label>
                                        <input type="text"
                                            {...register("senderNumber", {
                                                required: "Sender number is required",
                                                pattern: {
                                                    value: /^01[3-9]\d{8}$/,
                                                    message: "Enter valid number (01XXXXXXXXX)"
                                                }
                                            })}
                                            disabled={isSubmitting}
                                            className={`w-full px-4 py-2.5 border ${errors.senderNumber ? 'border-red-600' : 'border-gray-300'} focus:outline-none focus:border-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                            placeholder="01XXXXXXXXX"
                                        />
                                        {errors.senderNumber && (
                                            <p className="text-red-600 text-xs mt-1.5">{errors.senderNumber.message}</p>
                                        )}
                                        <p className="text-xs text-gray-500 mt-1.5">যে নাম্বার থেকে টাকা পাঠিয়েছেন</p>
                                    </div>

                                    {/* Transaction ID */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Transaction ID <span className="text-red-600">*</span>
                                        </label>
                                        <input type="text"
                                            {...register("transactionId", {
                                                required: "Transaction ID is required",
                                                minLength: { value: 8, message: "Must be at least 8 characters" }
                                            })}
                                            disabled={isSubmitting}
                                            className={`w-full px-4 py-2.5 border ${errors.transactionId ? 'border-red-600' : 'border-gray-300'} focus:outline-none focus:border-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed`}
                                            placeholder="Enter transaction ID"
                                        />
                                        {errors.transactionId && (
                                            <p className="text-red-600 text-xs mt-1.5">{errors.transactionId.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="border border-gray-200 p-6 sticky top-4">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>

                                {/* Product List */}
                                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                                    {cartProducts.map((item, index) => (
                                        <div key={index} className="flex gap-3">
                                            <div className="w-14 h-14 bg-gray-100 flex-shrink-0"></div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-gray-900 text-sm mb-1">{item.name}</p>
                                                <div className="flex flex-wrap gap-1.5 text-xs text-gray-600 mb-1">
                                                    {item.selectedColor && <span>{item.selectedColor}</span>}
                                                    {item.selectedSize && <span>• {item.selectedSize}</span>}
                                                    <span>• Qty: {item.quantity}</span>
                                                </div>
                                                <p className="font-semibold text-gray-900 text-sm">
                                                    ৳{((item.sale?.active ? item.sale.price : item.price) * item.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Details */}
                                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                                    <div className="flex justify-between text-sm text-gray-700">
                                        <span>Subtotal</span>
                                        <span className="font-medium">৳{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-700">
                                        <span>Delivery</span>
                                        <span className="font-medium">Free</span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
                                    <span className="text-base font-semibold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-gray-900">৳{total.toFixed(2)}</span>
                                </div>

                                {/* Payment Breakdown */}
                                <div className="bg-gray-50 p-4 mb-6 space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-700">Pay Now ({paymentMethod === "bkash" ? "bKash" : "Nagad"})</span>
                                        <span className="font-bold text-gray-900">৳{advanceAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-700">Pay on Delivery</span>
                                        <span className="font-bold text-gray-900">৳{payableOnDelivery.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Place Order Button */}
                                <button type="submit" disabled={isSubmitting}
                                    className="w-full py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        'Place Order'
                                    )}
                                </button>

                                <p className="text-xs text-gray-500 text-center mt-4">
                                    By placing order, you agree to our terms
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}