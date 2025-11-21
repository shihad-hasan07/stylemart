import { configureStore } from "@reduxjs/toolkit";
import allProduct_api from "./features/All_Products/_allProduct_api";
import cartReducer from "@/redux/features/addToCart/slice_addtoCart";
import wishlistReducer from "@/redux/features/addToWishlist/slice_addtoWishlist";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer,
        [allProduct_api.reducerPath]: allProduct_api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(allProduct_api.middleware),
});

export default store;
