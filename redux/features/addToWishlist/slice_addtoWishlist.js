import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",

    initialState: {
        wishlistProducts: [],
    },

    reducers: {
        // Load from localStorage
        replaceState: (state, action) => {
            return action.payload; 
        },

        addToWishlist: (state, action) => {
            const {
                _id,
                name,
                image,
                originalPrice,
                salePrice,
                inStock,
            } = action.payload;

            const exists = state.wishlistProducts.some(
                item => item._id === _id
            );

            if (!exists) {
                state.wishlistProducts.push({
                    _id,
                    name,
                    image,
                    originalPrice,
                    salePrice,
                    inStock,
                    addedAt: new Date().toISOString(),
                });
            }
        },

        removeFromWishlist: (state, action) => {
            const { _id } = action.payload;

            state.wishlistProducts = state.wishlistProducts.filter(
                item => item._id !== _id
            );
        },

        clearWishlist: (state) => {
            state.wishlistProducts = [];
        },
    },
});

export const {
    replaceState,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
