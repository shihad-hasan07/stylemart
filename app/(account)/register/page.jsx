'use client'
import React, { useState, useContext, use } from 'react';
import { allContext } from '@/Auth/Authprovider';
import { useRouter } from 'next/navigation';
import { FaFacebookSquare } from 'react-icons/fa';
import { ImGoogle2 } from "react-icons/im";
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import useAxios from '@/hooks/useAxios';
import { toast } from 'react-toastify';

const SignUp_page = () => {
    const { signup, user, googleLogin } = useContext(allContext);
    const router = useRouter();
    const axiosPublic = useAxios()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters!');
            return;
        }
        setLoading(true);
        const result = await signup(formData.email, formData.password, formData.name);


        setLoading(false);

        if (result.success) {

            // save user to database
            const userData = {
                name: result.user.displayName || formData.name,
                email: result.user.email,
                photoURL: result.user.photoURL || '',
                role: "user",
                phone: "",
                address: {},
            };
            try {
                await axiosPublic.post('/users/create-user', userData);
                router.push('/');
                toast.success('Account created successfully')
            }
            catch (err) {
                await result.user.delete();
                toast.error('Failed to create account')
                setError('Failed to save user please try again');
            }
        } else {
            setError(result.error);
        }
    };

    return (
        <div className='container mx-auto px-0 xl:px-20 mt-2'>
            {/* navigation */}
            <div className='flex items-center px-5 xl:px-0 gap-1 text-[14px] max-w-3/4'>
                <Link href='/'><p>Home</p></Link>
                <IoIosArrowForward />
                <Link href='/register' className='text-gray-400'><p>Register</p></Link>
            </div>
            <div className="container mx-auto px-12 sm:px-20 md:px-24 lg:px-72 xl:px-96  py-5">
                <h2 className='text-center font-semibold text-2xl my-4'>Register Account</h2>
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div>
                        <p className='text-sm text-gray-500'>Username *</p>
                        <input type="text" name="name" value={formData.name} onChange={handleChange}
                            className="bg-[#e8f0fed5] outline-red-400 w-full mt-1.5 px-5 py-3" required placeholder='Your name'
                        />
                    </div>

                    {/* Email */}
                    <div className='mt-4'>
                        <p className='text-sm text-gray-500'>Email *</p>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                            className="bg-[#e8f0fed5] outline-red-400 w-full mt-1.5 px-5 py-3" required placeholder='Email Address'
                        />
                    </div>

                    {/* Password */}
                    <div className='mt-4'>
                        <p className='text-sm text-gray-500'>Password *</p>
                        <input type="password" name="password" value={formData.password} onChange={handleChange}
                            className="bg-[#e8f0fed5] outline-red-400 w-full mt-1.5 px-5 py-3"
                            required placeholder='Password'
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className='mt-4'>
                        <p className='text-sm text-gray-500'>Confirm password *</p>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                            className="bg-[#e8f0fed5] outline-red-400 w-full mt-1.5 px-5 py-3" required
                            placeholder='Confirm Password'
                        />
                    </div>

                    {error && (
                        <div className='bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded mt-4'>
                            {error}
                        </div>
                    )}

                    <button type="submit" disabled={loading}
                        className='cursor-pointer bg-[#f05350] w-full font-medium text-xl text-white py-3 mt-7 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Creating Account...' : 'Continue'}
                    </button>
                </form>
                <div className='flex items-center my-5'>
                    <p className='border w-full opacity-15'></p>
                    <p className='w-[300px] text-center text-xs font-semibold'>Or login with</p>
                    <p className='border w-full opacity-15'></p>
                </div>
                <div className='flex gap-5 '>
                    <div onClick={() => googleLogin()} className='cursor-pointer bg-[#4285f4] w-full py-3 gap-2.5 flex items-center justify-center'>
                        <ImGoogle2 fill='white' size={22} />
                        <p className='text-white text-xl font-medium'>Google</p>
                    </div>
                    <div className='bg-[#3b5998] w-full py-3 flex gap-2.5 items-center justify-center'>
                        <FaFacebookSquare fill='white' size={22} />
                        <p className='cursor-pointer text-white text-xl font-medium'>Facebook</p>
                    </div>
                </div>
                <div className='flex items-center mt-4 mb-2.5'>
                    <p className='border w-full opacity-10'></p>
                    <p className='w-[510px] text-center text-xs font-semibold'>Already have an account?</p>
                    <p className='border w-full opacity-10'></p>
                </div>
                <p className='text-sm'>If you already have an account, please login at the</p>
                <Link href='/login' className='text-sm font-semibold tracking-wide text-yellow-600 '>Login page.</Link>
            </div>
        </div>
    );
};

export default SignUp_page;