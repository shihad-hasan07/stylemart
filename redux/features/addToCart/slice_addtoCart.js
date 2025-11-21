import { createSlice } from "@reduxjs/toolkit";

const calcTotals = (state) => {
    state.totalItems = state.cartProducts.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    state.totalPrice = parseFloat(
        state.cartProducts
            .reduce((sum, item) => {
                const itemPrice = item.sale?.active ? item.sale.price : item.price;
                return sum + itemPrice * item.quantity;
            }, 0)
            .toFixed(2)
    );
};

const slice_addtoCart = createSlice({
    name: "cart",
    initialState: {
        cartProducts: [],
        totalItems: 0,
        totalPrice: 0,
    },

    reducers: {
        replaceState: (state, action) => {
            return action.payload;
        },

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
                stock,
            } = action.payload;

            const existingItem = state.cartProducts.find(
                (item) =>
                    item._id === _id &&
                    item.selectedColor === selectedColor &&
                    item.selectedSize === selectedSize
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.cartProducts.push({
                    _id,
                    name,
                    slug,
                    price,
                    sale,
                    image,
                    selectedColor,
                    selectedSize,
                    quantity,
                    stock,
                });
            }

            calcTotals(state);
        },

        removeFromCart: (state, action) => {
            const { _id, selectedColor, selectedSize } = action.payload;

            state.cartProducts = state.cartProducts.filter(
                (item) =>
                    !(
                        item._id === _id &&
                        item.selectedColor === selectedColor &&
                        item.selectedSize === selectedSize
                    )
            );

            calcTotals(state);
        },

        updateQuantity: (state, action) => {
            const { _id, selectedColor, selectedSize, quantity } = action.payload;

            const item = state.cartProducts.find(
                (i) =>
                    i._id === _id &&
                    i.selectedColor === selectedColor &&
                    i.selectedSize === selectedSize
            );

            if (item) {
                item.quantity = quantity;
                calcTotals(state);
            }
        },

        increaseQuantity: (state, action) => {
            const { _id, selectedColor, selectedSize } = action.payload;

            const product = state.cartProducts.find(
                (i) =>
                    i._id === _id &&
                    i.selectedColor === selectedColor &&
                    i.selectedSize === selectedSize
            );

            if (product && product.quantity < product.stock.quantity) {
                product.quantity += 1;
                calcTotals(state);
            }
        },

        decreaseQuantity: (state, action) => {
            const { _id, selectedColor, selectedSize } = action.payload;

            const product = state.cartProducts.find(
                (i) =>
                    i._id === _id &&
                    i.selectedColor === selectedColor &&
                    i.selectedSize === selectedSize
            );

            if (product && product.quantity > 1) {
                product.quantity -= 1;
                calcTotals(state);
            }
        },

        clearCart: (state) => {
            state.cartProducts = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        },
    },
});

export const {
    replaceState,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} = slice_addtoCart.actions;

export default slice_addtoCart.reducer;
