'use client'
import React, { useState, useContext, use } from 'react';
import { allContext } from '@/Auth/Authprovider';
import { useRouter } from 'next/navigation';
import { FaFacebookSquare } from 'react-icons/fa';
import { ImGoogle2 } from "react-icons/im";
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

const Login_page = () => {
    const { login, user, googleLogin } = useContext(allContext);
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters!');
            return;
        }
        setLoading(true);
        const result = await login(formData.email, formData.password);
        setLoading(false);

        if (result.success) {
            router.push('/');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className='container mx-auto px-5 xl:px-20 mt-2'>
            {/* navigation */}
            <div className='flex items-center gap-1 text-[14px] max-w-3/4'>
                <Link href='/'><p>Home</p></Link>
                <IoIosArrowForward />
                <Link href='/login' className='text-gray-400'><p>Login</p></Link>
            </div>

            <div className="container mx-auto px-10 lg:px-96 py-5">

                <h2 className='text-center font-semibold text-2xl my-4'>Account Login</h2>
                <form onSubmit={handleSubmit}>

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

                    {error && (
                        <div className='bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded mt-4'>
                            {error}
                        </div>
                    )}

                    <button type="submit" disabled={loading}
                        className='bg-[#f05350] w-full font-medium text-xl text-white py-3 mt-7 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Logging' : 'Login'}
                    </button>
                </form>
                <div className='flex items-center my-5'>
                    <p className='border w-full opacity-15'></p>
                    <p className='w-[300px] text-center text-xs font-semibold'>Or login with</p>
                    <p className='border w-full opacity-15'></p>
                </div>
                <div className='flex gap-5'>
                    <div onClick={() => googleLogin()} className='cursor-pointer bg-[#4285f4] w-full py-3 gap-2.5 flex items-center justify-center'>
                        <ImGoogle2 fill='white' size={25} />
                        <p className='text-white text-xl font-medium'>Google</p>
                    </div>
                    <div className='bg-[#3b5998] w-full py-3 flex gap-2.5 items-center justify-center'>
                        <FaFacebookSquare fill='white' size={25} />
                        <p className='text-white text-xl font-medium'>Facebook</p>
                    </div>
                </div>
                <div className='flex items-center my-5'>
                    <p className='border w-full opacity-10'></p>
                    <p className='w-[510px] text-center text-xs font-semibold'>Don't have an account?</p>
                    <p className='border w-full opacity-10'></p>
                </div>
                <Link href='/register' className=''>
                    <p className='border text-center py-2.5 mb-5'>Create your account</p>
                </Link>
            </div>
        </div>
    );
};

export default Login_page;