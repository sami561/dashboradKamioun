import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://34.10.183.252/api",
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
    updateOrderState: build.mutation({
      query: ({ id, state }) => ({
        url: `orders/${id}/state`,
        method: "PUT",
        body: { state },
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrderStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `orders/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
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
  useUpdateOrderStateMutation,
  useUpdateOrderStatusMutation,
} = ordersApi;
