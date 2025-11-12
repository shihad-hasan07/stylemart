import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const allProduct_api = createApi({
    reducerPath: 'allProductApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000'
    }),
    tagTypes: ['allProducts'],
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => '/products',
            providesTags: ['allProducts']
        })
    })
})

export const { useGetAllProductsQuery } = allProduct_api
export default allProduct_api;