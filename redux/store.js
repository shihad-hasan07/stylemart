import { configureStore } from "@reduxjs/toolkit";
import AddvalueReducer from './features/addvalueslice'
import allProduct_api from "./features/All_Products/_allProduct_api";

const store = configureStore({
    reducer: {
        addValue: AddvalueReducer,
        [allProduct_api.reducerPath]: allProduct_api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(allProduct_api.middleware)

})

export default store