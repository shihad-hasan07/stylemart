'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

const namess = [
    { dashboard: 'Overview of your store performance' },
    { products: 'Manage your product inventory' },
    { 'add product': 'Provide details to list a new product' },
    { 'update product': 'Update details of an existing product' },
    { orders: 'Track and manage customer orders' },
    { sales: 'Create and manage sales campaigns' },
    { customers: 'View and manage customer data' },
    { settings: 'Configure your store settings' }
]

const Routes_heading_texts = ({ name, total, backButtonLink, isSubmitting }) => {
    const text = namess.find(obj => obj[name])?.[name];
    const router = useRouter()

    return (
        <div className="capitalize bg-white px-6 py-4 border-b border-gray-300 space-y-1">
            {
                backButtonLink
                    ? <div className="flex  flex-col sm:flex-row space-y-1 sm:space-y-0 sm:items-center justify-between gap-2.5">
                        <div className="">
                            <p className="text-2xl text-gray-800 font-semibold">{name} <span>{`${total >= 0 ? `(${total})` : ''}`}</span></p>
                            <p className="text-sm text-gray-500">{text}</p>
                        </div>
                        <div className="flex gap-3">
                            <button disabled={isSubmitting} onClick={() => { if (!isSubmitting) router.push("/dashboard/products") }}
                                className='cursor-pointer hover:bg-gray-100 flex items-center gap-1.5 text-sm sm:text-base border border-gray-300 rounded-md px-3 sm:px-4 py-2'>Cancel</button>

                            <button type="submit"
                                form="addProductForm" disabled={isSubmitting}
                                className='cursor-pointer  border border-gray-400 rounded-md px-3 text-sm sm:text-base sm:px-5.5 py-2 font-semibold bg-red-500 hover:opacity-90 text-white'>
                                {
                                    isSubmitting ? 'Publishing…' :
                                        'Publish product'
                                }
                            </button>
                        </div>
                    </div>
                    :
                    <div className="">
                        <p className="text-2xl text-gray-800 font-semibold">{name} <span>{`${total >= 0 ? `(${total})` : ''}`}</span></p>
                        <p className="text-sm text-gray-500">{text}</p>
                    </div>
            }
        </div>
    );
};

export default Routes_heading_texts;