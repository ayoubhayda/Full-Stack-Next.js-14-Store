"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = process.env.NEXT_PUBLIC_REST_API_URL;
export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  }),
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: `carts`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Carts"],
    }),
    getCartItems: builder.query({
      query: (email) =>
        `carts?populate[products][populate]=banner&filters[email][$eq]=${email}`,
      invalidatesTags: ["Carts"],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `carts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Carts"],
    }),
  }),
});

export const {
  useGetCartItemsQuery,
  useAddToCartMutation,
  useDeleteCartMutation,
} = cartApi;
