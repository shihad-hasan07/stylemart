'use client'
import ProductVariations from '@/app/dashboard/components/Demooooooooooooo';
import Routes_heading_texts from '@/app/dashboard/components/shared/Routes_heading_texts';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

const categories = [
    "Men",
    "Women",
    "Kids",
    "Baby",
    "Outerwear",
    "Accessories",
    "Bags",
    "Belts",
    "Watches",
    "Wallets",
    "Shoes",
    "Others",
];


const add_products = () => {
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, getValues, setValue, watch, clearErrors, formState: { errors, isSubmitting } } = useForm(
        {
            defaultValues: {
                saleEnd: '',
            },
            mode: "onChange",
        }
    );

    // uplaod image.
    const [imageError, setImageError] = useState("");
    const [images, setImages] = useState([null, null, null, null]);
    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const updated = [...images];
        updated[index] = {
            file,
            preview: URL.createObjectURL(file),
        };

        setImages(updated);
        setValue(`images.${index}`, file);
    };

    const removeImage = (index) => {
        const updated = [...images];
        updated[index] = null;
        setImages(updated);
        setValue(`images.${index}`, null);
    };

    const selectedCategories = watch("categories") || [];
    const [productVaritaions, setProductVaritaions] = useState([])

    const saleEnd = watch("saleEnd");

    const saleActive = watch("sale");
    useEffect(() => {
        register("saleEnd", {
            validate: (value) => {
                if (!saleActive) return true;
                return value ? true : "Sale end date is required";
            },
        });
    }, [register, saleActive]);

    const onSubmit = async (data) => {
        const hasAtLeastOneImage = images.some(img => img !== null);
        if (!hasAtLeastOneImage) {
            setImageError("At least one image is required");
            return;
        }
        setImageError("");

        data.inStock = data.inStock === "true";
        const saleEndISOFomat =
            data.sale && data.saleEnd
                ? new Date(`${data.saleEnd}T23:59:59Z`).toISOString()
                : null;

        const finalData = {
            sku: data.sku,
            name: data.name,
            slug: data.slug,
            brand: data.brand,
            description: data.description,
            sortDescription: data.sortDescription,
            price: data.price,
            sale: {
                active: data.sale,
                price: data.saleprice || null,
                ends: (data.saleEnd && saleEndISOFomat) || null,
            },
            categories: data.categories || [],
            tags: data.tags || [],

            stock: {
                inStock: data.inStock,
                quantity: data.quantity,
            },
            variations: productVaritaions
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(finalData));

        (data.images || []).forEach((file) => {
            if (file) {
                console.log('file is', file);
                formData.append("images", file);
            }
        });

        try {
            axiosSecure.post("/products/add-product", formData);
        } catch (err) {
            console.log('error happen ', err.message);
        }
    };


    return (
        <div>
            <Routes_heading_texts name={'add product'} backButtonLink={true} />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-6 m-5 bg-white rounded-xl py-5 mt-3"
            >
                <h2 className='font-bold col-span-2 text-lg mb-3'>Basic Information</h2>
                <div className=' grid grid-cols-1 md:grid-cols-2 gap-6'>

                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-semibold mb-1"> Product Name <span className="text-red-500">*</span> </label>
                        <input className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
                            placeholder="e.g. Classic Denim Jacket"
                            {...register("name", { required: "Product name required" })}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500 mt-1"> {errors.name.message} </p>
                        )}
                    </div>

                    {/* Brand */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">  Brand </label>
                        <input className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800" placeholder="e.g. Stylemart"
                            {...register('brand')}
                        />
                    </div>

                    {/* SKU */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">  SKU <span className="text-red-500">*</span> </label>
                        <input className="w-full rounded-md border border-gray-300 px-3 py-2"
                            placeholder="e.g. NIKE-AIR-MAX-42"
                            {...register("sku", {
                                required: "SKU is required",
                                setValueAs: (value) => value
                                    .trim()
                                    .replace(/\s+/g, "-")
                                    .replace(/-+/g, "-")
                                    .replace(/^-|-$/g, "")
                            })}
                        />
                        {errors.sku && (
                            <p className="text-xs text-red-500 mt-1"> {errors.sku.message} </p>
                        )}
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-semibold mb-1"> Slug <span className="text-red-500">*</span> </label>
                        <input
                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                            placeholder="e.g. classic-denim-jacket"
                            {...register("slug", {
                                required: "Slug is required",
                                setValueAs: (value) =>
                                    value
                                        .toLowerCase()
                                        .trim()
                                        .replace(/\s+/g, "-")
                                        .replace(/-+/g, "-")
                                        .replace(/^-|-$/g, ""),
                            })}
                        />

                        {errors.slug && (
                            <p className="text-xs text-red-500 mt-1"> {errors.slug.message} </p>
                        )}
                    </div>

                    {/* Short Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-1">Short Description <span className="text-red-500">*</span> </label>
                        <textarea rows={2} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="A brief one-line description..."
                            {...register("sortDescription", { required: "Sort desciption is required" })}
                        />
                        {errors.sortDescription && (
                            <p className="text-xs text-red-500 mt-1"> {errors.sortDescription.message} </p>
                        )}
                    </div>

                    {/* Full Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-1">Full Description <span className="text-red-500">*</span></label>
                        <textarea rows={5} className="w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Detailed product description..."
                            {...register("description", { required: "Products full description required" })}
                        />
                        {errors.description && (
                            <p className="text-xs text-red-500 mt-1"> {errors.description.message} </p>
                        )}
                    </div>
                </div>

                <hr className='mt-6 mb-5 text-gray-300' />

                <h2 className='font-bold col-span-2 text-lg mb-3'>Pricing & Stock</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {/* price */}
                    <div>
                        <label className="block text-sm font-semibold mb-1"> Price (৳) <span className="text-red-500">*</span></label>
                        <input type="number" step="1"
                            className="w-full rounded-md border border-gray-300 px-3 py-2  focus:outline-none focus:ring-2 focus:ring-blue-800"
                            placeholder="e.g. 1500"
                            {...register("price", {
                                required: "Price is required",
                                valueAsNumber: true,
                                min: { value: 0, message: "Price cannot be negative" },
                            })}
                        />

                        {errors.price && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.price.message}
                            </p>
                        )}
                    </div>

                    {/* stock quantity */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Stock Quantity <span className="text-red-500">*</span> </label>
                        <input type="number"
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
                            placeholder="e.g. 20"
                            {...register("quantity", {
                                required: "Quantity is required",
                                valueAsNumber: true,
                                min: { value: 0, message: "Quantity cannot be negative" },
                            })}
                        />
                        {errors.quantity && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.quantity.message}
                            </p>
                        )}
                    </div>

                    {/* stock status */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Stock Status</label>
                        <select className="cursor-pointer w-full rounded-md border border-gray-300 px-3 py-2" value={String(watch("inStock"))}
                            {...register("inStock",
                                //  {setValueAs: (v) => v === "true",}
                            )}>
                            <option value="true" className='cursor-pointer'>In Stock</option>
                            <option value="false">Out of Stock</option>
                        </select>
                    </div>
                </div>

                <hr className='mt-6 mb-5 text-gray-300' />

                {/* sale related */}
                <div className='flex justify-between'>
                    <div className='mb-5'>
                        <h2 className='font-bold col-span-2 text-lg mb-1.5'>Sale Setting</h2>
                        <p className="text-xs sm:text-sm text-gray-600">Control sale status, discounted price, and sale duration</p>
                    </div>
                    <div className="md:col-span-2 flex items-center gap-3">
                        <label className="text-sm font-semibold"> Active Sale</label>

                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox"
                                className="sr-only peer"
                                {...register("sale")}
                            />

                            {/* track */}
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-red-500 transition-colors" />
                            {/* knob */}
                            <div className=" absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5 " />
                        </label>
                    </div>

                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* sale price */}
                    <div>
                        <label className="block text-sm font-semibold mb-1"> Sale Price (৳) <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            step="1"
                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                            {...register("saleprice", {
                                valueAsNumber: true,
                                min: { value: 0, message: "Price cannot be negative" },
                                validate: (value) => {
                                    if (!saleActive) return true; // sale false → validation skip
                                    if (!value) return "Sale price is required";
                                    const price = getValues("price");
                                    return value < price || "Sale price must be lower than regular price";
                                },
                            })}
                        />
                        {errors.saleprice && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.saleprice.message}
                            </p>
                        )}
                    </div>

                    {/* Sale End Date */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">
                            Sale End <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                            {/* Calendar Icon */}
                            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">📅</span>

                            <Flatpickr value={saleEnd}
                                options={{
                                    dateFormat: "Y-m-d",
                                    minDate: "today",
                                    disableMobile: true,
                                }}
                                placeholder="Select sale end date"
                                onChange={([date]) => {
                                    if (date) {
                                        const formatted = date.toISOString().split("T")[0];
                                        setValue("saleEnd", formatted, { shouldValidate: true });
                                    }
                                }}
                                className=" w-full rounded-md border border-gray-300 pl-10 pr-3 py-[9px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 cursor-pointer"
                            />
                        </div>

                        {errors.saleEnd && (
                            <p className="text-xs text-red-500 mt-1">
                                {errors.saleEnd.message}
                            </p>
                        )}
                    </div>

                </div>

                <hr className='mt-6 mb-5 text-gray-300' />

                {/* category */}
                <div>
                    <label className="block text-sm font-semibold mb-2">
                        Categories <span className="text-red-500">*</span>
                    </label>

                    <div className="flex flex-wrap gap-3">
                        {categories.map((cat) => {
                            const isChecked = selectedCategories.includes(cat);
                            const isDisabled =
                                selectedCategories.length >= 2 && !isChecked;

                            return (
                                <label key={cat} className={`flex items-center gap-2 px-3.5 py-2 border border-gray-300 rounded-sm ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                                    <input type="checkbox" value={cat} disabled={isDisabled}
                                        {...register("categories", {
                                            validate: (value) =>
                                                value.length <= 2 ||
                                                "You can select up to 2 categories only",
                                        })}
                                    />
                                    <span className="text-sm">{cat}</span>
                                </label>
                            );
                        })}
                    </div>
                    {errors.categories && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.categories.message}
                        </p>
                    )}
                </div>

                {/* tags */}
                <div className="mt-6">
                    <label className="block text-sm font-semibold mb-1"> Tags (comma separated) </label>
                    <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
                        placeholder="denim, jacket, casual, layering"
                        {...register("tags", {
                            setValueAs: (value) =>
                                value
                                    .split(",")
                                    .map((tag) => tag.trim())
                                    .filter(Boolean),
                            validate: (value) =>
                                value.length <= 5 || "You can add up to 5 tags only",
                        })}
                    />
                    {errors.tags && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.tags.message}
                        </p>
                    )}
                </div>

                <hr className='mt-6 mb-5 text-gray-300' />

                {/* upload images */}
                <div>
                    <label className="block text-sm font-semibold mb-2"> Product Images (max 4) </label>
                    {imageError && (
                        <p className="text-xs font-medium text-red-500 mb-2">{imageError}</p>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((img, index) => (
                            <div key={index} className="relative">
                                <label className="h-40 sm:h-50 xl:h-60 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500">
                                    <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => handleImageChange(e, index)} />

                                    {img ? <img src={img.preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                                        : <div className="text-center text-gray-500">
                                            <p className="text-sm font-medium">Upload Image</p>
                                            <p className="text-xs">JPG, PNG, WEBP</p> </div>
                                    }
                                </label>

                                {img && (
                                    <button type="button" onClick={() => removeImage(index)}
                                        className="cursor-pointer absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 text-xs">
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                </div>

                <hr className='mt-6 mb-5 text-gray-300' />

                <ProductVariations setProductVaritaions={setProductVaritaions} />


                {/* Submit */}
                <div className="mt-6">
                    <button disabled={isSubmitting}
                        className="px-6 py-2 cursor-pointer rounded-md font-semibold bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                    >
                        {isSubmitting ? "Publishing…" : "Publish Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default add_products;