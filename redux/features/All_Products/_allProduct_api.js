import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const allProduct_api = createApi({
    reducerPath: 'allProductApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://localhost:5000'
        baseUrl: 'https://stylemart-server.vercel.app'
    }),
    tagTypes: ['allProducts'],
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => '/products',
            providesTags: ['allProducts']
        }),
        getSingleProduct: builder.query({
            query: (id) => `/product/${id}`
        })
    })
})

export const { useGetAllProductsQuery, useGetSingleProductQuery } = allProduct_api
export default allProduct_api;