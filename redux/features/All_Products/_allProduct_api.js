import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const allProduct_api = createApi({
    reducerPath: 'allProductApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://localhost:5000/api/v1'
        baseUrl: 'https://stylemart-server-v2.vercel.app/api/v1'
    }),
    tagTypes: ['allProducts'],
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: (params) => ({
                url: '/products',
                // params: params
            }),
            providesTags: ['allProducts']
        }),
        getSingleProduct: builder.query({
            query: (id) => `/products/single/${id}`
        })
    })
})

export const { useGetAllProductsQuery, useGetSingleProductQuery } = allProduct_api
export default allProduct_api;