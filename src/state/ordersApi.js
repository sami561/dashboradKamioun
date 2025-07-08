import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://http://34.173.189.86/api/kamarket",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Orders"],
  endpoints: (build) => ({
    getOrders: build.query({
      query: () => "orders/all",
      providesTags: ["Orders"],
    }),
    getOrderById: build.query({
      query: (id) => `orders/${id}`,
      providesTags: ["Orders"],
    }),
    createOrder: build.mutation({
      query: (data) => ({
        url: "orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrder: build.mutation({
      query: ({ id, ...data }) => ({
        url: `orders/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrder: build.mutation({
      query: (id) => ({
        url: `orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrdersCount: build.query({
      query: () => "orders/count",
      providesTags: ["Orders"],
    }),
    getOrdersByStatus: build.query({
      query: (status) => `orders/status/${status}`,
      providesTags: ["Orders"],
    }),
    getCompletedOrdersTotal: build.query({
      query: () => "orders/totals/completed",
      providesTags: ["Orders"],
    }),
    getGvmPerMonth: build.query({
      query: () => "orders/gvm-per-month",
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetOrdersCountQuery,
  useGetOrdersByStatusQuery,
  useGetCompletedOrdersTotalQuery,
  useGetGvmPerMonthQuery,
} = ordersApi;
