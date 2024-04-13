"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_REST_API_URL;
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  }),
  endpoints: (builder) => ({
    getLatestProducts: builder.query({
      query: () => "/products?populate=*",
      invalidatesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}?populate=*`,
      invalidatesTags: ["Product"],
    }),
    getProductsByCategory: builder.query({
      query: (category) =>
        `/products?filters[category][$eq]=${category}&populate=*`,
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetLatestProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
} = productApi;
