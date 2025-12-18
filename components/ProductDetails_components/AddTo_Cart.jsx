import { addToCart, increaseQuantity, updateQuantity } from '@/redux/features/addToCart/slice_addtoCart';
import React, { useState, useEffect } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { cartSuccessToast } from '../shared/addToCart_Alert';

const AddTo_Cart = ({ info }) => {
    const { selectedColor, selectedSize, _id, name, slug, price, sale, images, stock, colors, sizes } = info;
    // colors and sizes array check করার জন্য নিলাম
    
    const dispatch = useDispatch();

    const cartProducts = useSelector((state) => state.cart.cartProducts);

    const [quantity, setQuantity] = useState(1);
    const [validationError, setValidationError] = useState('');

    //  Check if item already exists in cart
    const existingCartItem = cartProducts?.find(
        item => item._id === _id &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
    );

    //  Reset quantity when color/size changes
    useEffect(() => {
        setQuantity(1);
        setValidationError('');
    }, [selectedColor, selectedSize]);

    const handle_addtoCart = () => {
        // Dynamic validation based on available options
        const hasColorOptions = colors && colors.length > 0;
        const hasSizeOptions = sizes && sizes.length > 0;

        let validationMessage = '';

        // Check করো কোনটা select করা দরকার
        if (hasColorOptions && !selectedColor) {
            validationMessage = 'Please select a color';
        } else if (hasSizeOptions && !selectedSize) {
            validationMessage = 'Please select a size';
        } else if (hasColorOptions && hasSizeOptions && (!selectedColor || !selectedSize)) {
            validationMessage = 'Please select both color and size';
        }

        // Validation error থাকলে show করো
        if (validationMessage) {
            setValidationError(validationMessage);
            setTimeout(() => setValidationError(''), 4000);
            return;
        }

        // Clear validation error
        setValidationError('');

        // Validation: Stock available ache kina
        if (!stock?.inStock || stock?.quantity < 1) {
            setValidationError('Product is out of stock');
            setTimeout(() => setValidationError(''), 4000);
            return;
        }

        // Cart e already ache kina check koro
        if (existingCartItem) {
            const newQuantity = existingCartItem.quantity + quantity;

            // Stock check koro
            if (newQuantity > stock.quantity) {
                setValidationError(`Only ${stock.quantity} items available in stock`);
                setTimeout(() => setValidationError(''), 4000);
                return;
            }

            dispatch(updateQuantity({
                _id,
                selectedColor,
                selectedSize,
                quantity: newQuantity
            }));
            
            cartSuccessToast({
                quantity: quantity,
                productName: name,
            });
        } else {
            // Notun item, cart e add koro
            dispatch(addToCart({
                _id,
                name,
                slug,
                price,
                sale,
                image: images[0],
                selectedColor,
                selectedSize,
                quantity,
                stock
            }));

            cartSuccessToast({
                quantity: quantity,
                productName: name,
            });
        }

        // Quantity reset kore dao
        setQuantity(1);
    };

    const handle_increase_quantity = () => {
        if (quantity < stock?.quantity) {
            setQuantity(quantity + 1);
        }
    };

    const handle_decrease_quantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const availableStock = existingCartItem
        ? stock.quantity - existingCartItem.quantity
        : stock.quantity;

    return (
        <div className='mt-6'>
            {/* Validation Error */}
            {validationError && (
                <div className='mb-3 bg-red-50 border-l-4 border-red-500 px-4 py-3 rounded-md animate-pulse'>
                    <p className='text-red-700 text-sm font-medium'>{validationError}</p>
                </div>
            )}

            {/* Stock warning messages */}
            {!stock?.inStock && !validationError && (
                <p className='text-red-700 mb-1.5 font-medium'>Out of Stock</p>
            )}
            {stock?.inStock && quantity >= availableStock && !validationError && (
                <p className='text-red-700 mb-1.5'>
                    {existingCartItem
                        ? `You already have ${existingCartItem.quantity} in cart. Maximum available: ${availableStock}`
                        : 'Maximum stock reached'}
                </p>
            )}
            {existingCartItem && !validationError && (
                <p className='text-green-700 mb-1.5'>
                    Already in cart: {existingCartItem.quantity} item(s)
                </p>
            )}

            <div className="flex gap-3">
                {/* Quantity Selector */}
                <div className="rounded-xs border-gray-300 border w-fit px-3 py-2.5 flex items-center gap-6">
                    <FiMinus
                        onClick={handle_decrease_quantity}
                        size={24}
                        className={`cursor-pointer active:scale-80 hover:text-red-700 transition duration-300 ${quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    />
                    <p className="min-w-[18px] text-center">{quantity}</p>
                    <FiPlus
                        onClick={handle_increase_quantity}
                        size={22}
                        className={`cursor-pointer active:scale-90 hover:text-red-700 transition duration-200 ${quantity >= availableStock ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    />
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handle_addtoCart}
                    disabled={!stock?.inStock || quantity > availableStock}
                    className={`rounded-xs cursor-pointer px-7 py-2.5 text-white bg-[#2f9e44] active:scale-95 hover:bg-[#29843b] transition duration-100 ${(!stock?.inStock || quantity > availableStock) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {existingCartItem ? 'Update Cart' : 'Add to cart'}
                </button>
            </div>
        </div>
    );
};

export default AddTo_Cart;