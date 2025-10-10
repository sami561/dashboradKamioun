import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://34.10.183.252/api/kamarket",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Cart"],
  endpoints: (build) => ({
    getCart: build.query({
      query: () => "cart/all",
      providesTags: ["Cart"],
    }),
    getCartById: build.query({
      query: (id) => `cart/${id}`,
      providesTags: ["Cart"],
    }),
    addToCart: build.mutation({
      query: (data) => ({
        url: "cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: build.mutation({
      query: ({ id, ...data }) => ({
        url: `cart/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCart: build.mutation({
      query: (id) => ({
        url: `cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: build.mutation({
      query: () => ({
        url: "cart/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    getCartCount: build.query({
      query: () => "cart/count",
      providesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useGetCartByIdQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useGetCartCountQuery,
} = cartApi;
