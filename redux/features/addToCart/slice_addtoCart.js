import { createSlice } from "@reduxjs/toolkit";

const slice_addtoCart = createSlice({
    name: 'cart',
    initialState: {
        cartProducts: [],
        totalItems: 0,
        totalPrice: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const {
                _id,
                name,
                slug,
                price,
                sale,
                image,
                selectedColor,
                selectedSize,
                quantity,
                stock
            } = action.payload;

            console.log('cartProduct', action.payload);

            const existingItem = state.cartProducts.find(
                item => item._id === _id &&
                    item.selectedColor === selectedColor &&
                    item.selectedSize === selectedSize
            );

            if (existingItem) {
                // Increase the quantity if the item already exists
                existingItem.quantity += quantity;
            } else {
                // Add new item to cart
                state.cartProducts.push({ _id, name, slug, price, sale, image, selectedColor, selectedSize, quantity, stock });
            }

            // Update total_items and total_Price
            state.totalItems = state.cartProducts.reduce((sum, item) => sum + item.quantity, 0);
            state.totalPrice = state.cartProducts.reduce((sum, item) => {
                const itemPrice = item.sale?.active ? item.sale.price : item.price;
                return sum + (itemPrice * item.quantity);
            }, 0);
        },

        removeFromCart: (state, action) => {
            const { _id, selectedColor, selectedSize } = action.payload;
            state.cartProducts = state.cartProducts.filter(
                item => !(item._id === _id &&
                    item.selectedColor === selectedColor &&
                    item.selectedSize === selectedSize)
            );

            // Update totals after removing item
            state.totalItems = state.cartProducts.reduce((sum, item) => sum + item.quantity, 0);
            state.totalPrice = state.cartProducts.reduce((sum, item) => {
                const itemPrice = item.sale?.active ? item.sale.price : item.price;
                return sum + (itemPrice * item.quantity);
            }, 0);
        },

        updateQuantity: (state, action) => {
            const { _id, selectedColor, selectedSize, quantity } = action.payload;

            const item = state.cartProducts.find(
                item => item._id === _id &&
                    item.selectedColor === selectedColor &&
                    item.selectedSize === selectedSize
            );

            if (item) {
                item.quantity = quantity;

                // Update totals
                state.totalItems = state.cartProducts.reduce((sum, item) => sum + item.quantity, 0);
                state.totalPrice = state.cartProducts.reduce((sum, item) => {
                    const itemPrice = item.sale?.active ? item.sale.price : item.price;
                    return sum + (itemPrice * item.quantity);
                }, 0);
            }
        },

        increaseQuantity: (state, action) => {
            const { _id, selectedColor, selectedSize } = action.payload;

            const product = state.cartProducts.find(
                res => res._id === _id &&
                    res.selectedColor === selectedColor &&
                    res.selectedSize === selectedSize
            );

            if (product && product.quantity < product.stock.quantity) {
                product.quantity += 1;

                // Update totals
                state.totalItems = state.cartProducts.reduce((sum, item) => sum + item.quantity, 0);
                state.totalPrice = state.cartProducts.reduce((sum, item) => {
                    const itemPrice = item.sale?.active ? item.sale.price : item.price;
                    return sum + (itemPrice * item.quantity);
                }, 0);
            }
        },

        decreaseQuantity: (state, action) => {
            const { _id, selectedColor, selectedSize } = action.payload;

            const product = state.cartProducts.find(
                res => res._id === _id &&
                    res.selectedColor === selectedColor &&
                    res.selectedSize === selectedSize
            );

            if (product && product.quantity > 1) {
                product.quantity -= 1;

                // Update totals
                state.totalItems = state.cartProducts.reduce((sum, item) => sum + item.quantity, 0);
                state.totalPrice = state.cartProducts.reduce((sum, item) => {
                    const itemPrice = item.sale?.active ? item.sale.price : item.price;
                    return sum + (itemPrice * item.quantity);
                }, 0);
            }
        },

        clearCart: (state) => {
            state.cartProducts = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart
} = slice_addtoCart.actions;

export default slice_addtoCart.reducer;