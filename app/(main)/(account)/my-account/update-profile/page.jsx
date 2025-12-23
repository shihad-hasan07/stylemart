'use client';
import React, { use, useContext, useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, Loader2, X } from 'lucide-react';
import { allContext } from '@/Auth/Authprovider';
import useAxios from '@/hooks/useAxios';
import { useRouter } from 'next/navigation';

export default function ProfileUpdatePage() {
    const { user, userfromDB, setUserfromDB, setLatestUpdate, updateProfileFn } = useContext(allContext)
    const useAxiosPublic = useAxios()
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(user?.photoURL || '/userNull.jpg')
    const router = useRouter()

    console.log('userfromDB', userfromDB);
    console.log('userfromDB', userfromDB?.address?.address);

    // Initial data from database
    const [formData, setFormData] = useState({
        name: user?.displayName || "",
        email: user?.email,
        phone: userfromDB?.phone || "",
        division: userfromDB?.address?.division || "",
        city: userfromDB?.address?.city || "",
        address: userfromDB?.address?.address || ""
    });

    const divisions = [
        "Select a Division", "Dhaka", "Chattogram", "Rajshahi", "Khulna",
        "Barishal", "Sylhet", "Rangpur", "Mymensingh"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setMessage({ type: 'error', text: 'Please select a valid image file' });
                return;
            }

            // Validate file size (5MB max)
            if (file.size > 10 * 1024 * 1024) {
                setMessage({ type: 'error', text: 'Image size should be less than 10MB' });
                return;
            }

            setImageFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(user?.photoURL);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const form = new FormData();

            // Append image only if user selected a new one
            if (imageFile) {
                form.append("photo", imageFile);
            } else {
                console.log(user.photoURL);
                form.append('photoURL', user?.photoURL)
            }

            // Append text fields
            form.append("name", formData.name);
            form.append("email", formData.email);
            form.append("phone", formData.phone);

            if (formData.division == "Select a Division") {
                form.append("division", "");
            } else {
                form.append("division", formData.division);
            }
            form.append("city", formData.city);
            form.append("address", formData.address);

            // Send request
            const res = await useAxiosPublic.patch(`/users/update/${userfromDB._id}`, form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (res.data.success) {
                await updateProfileFn(res.data.data.name, res.data.data.photoURL)
                setLatestUpdate(prev => prev + 1)
                setLoading(false)
                router.push('/my-account')
            }
            setMessage({ type: "success", text: "Profile updated successfully!" });

        } catch (err) {
            console.log(err);
            setMessage({ type: "error", text: "Failed to update" });

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="py-7 lg:py-0 container mx-auto px-1 sm:px-2 md:px-5">
            <div className="rounded-xl shadow-md bg-white overflow-hidden">
                {/* Header */}
                <div className="bg-[#073f74] px-5 sm:px-8 py-6">
                    <h1 className="text-3xl font-bold text-white">Update Profile</h1>
                    <p className="text-blue-100 mt-2">Edit your personal information</p>
                </div>

                {/* Profile Photo */}
                <div className="px-5 sm:px-8 py-6 border-b border-gray-200">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <img src={imagePreview || '/userNull.jpg'} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-gray-300" onError={(e) => e.target.src = '/userNull.jpg'} />
                            <input type="file" id="imageUpload" accept="image/*" onChange={handleImageChange} className="hidden" />
                            <label htmlFor="imageUpload" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 transition cursor-pointer" >
                                <Camera size={19} />
                            </label>

                            {imageFile && (
                                <button onClick={removeImage} className="cursor-pointer absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"> <X size={15} /></button>
                            )}
                        </div>

                        <div className="flex-1 max-w-[200px] sm:max-w-[800px] wrap-break-word">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Profile Photo
                            </label>
                            <p className="text-sm text-gray-500">
                                {imageFile ? (
                                    <span className="text-green-600 font-medium">
                                        {imageFile.name} ({(imageFile.size / 1024).toFixed(2)} KB)
                                    </span>
                                ) : (
                                    'Upload a new photo (Max 10MB)'
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-5 sm:px-8 space-y-6">
                    {/* Personal Information */}
                    <form onSubmit={handleSubmit}>


                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <User className="text-blue-600" size={20} />
                                Personal Information
                            </h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input type="text" name="name" value={formData.name} required onChange={handleChange}
                                    className=" w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0" placeholder="Enter your full name" />
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Mail className="inline mr-1" size={16} />
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input readOnly type="email" name="email" value={user?.email} required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0" placeholder="example@email.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Phone className="inline mr-1" size={16} /> Phone Number <span className="text-red-500">*</span>
                                </label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} pattern="01[0-9]{9}"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0" placeholder="Your contact number 01****"
                                />
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className="space-y-4 pt-4 border-t border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <MapPin className="text-blue-600" size={20} />
                                Address Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Division <span className="text-red-500">*</span>
                                    </label>
                                    <select name="division" value={formData.division} onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0 cursor-pointer"
                                    >
                                        {divisions.map(div => (
                                            <option key={div} value={div}>{div}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange}
                                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0z' placeholder="City name" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Detailed Address <span className="text-red-500">*</span>
                                </label>
                                <textarea name="address" value={formData.address} onChange={handleChange} rows="2"
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-0'
                                    placeholder="Road, Ward number, etc."
                                />
                            </div>
                        </div>

                        {/* Message */}
                        {message.text && (
                            <div className={`p-4 rounded-lg mt-1.5 mb-3 ${message.type === 'success'
                                ? 'bg-green-50 text-green-800 border border-green-200'
                                : 'bg-red-50 text-red-800 border border-red-200'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button type='submit'
                            disabled={loading}
                            className="w-full mt-3 bg-[#073f74] text-white py-4 rounded-lg font-semibold hover:bg-[#073f74ec] cursor-pointer transition-all transform  disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    Update Profile
                                </>
                            )}
                        </button>
                    </form>
                </div>

            </div>

            {/* Additional Info */}
            {/* <div className="mt-6 text-center text-white text-sm">
                    <p>Last updated: {new Date().toLocaleDateString('en-US')}</p>
                </div> */}

        </div>
    );
}