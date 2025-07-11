import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://kamioun-back-api-gateway-1:3000/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
    "Ads",
  ],
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    createProduct: build.mutation({
      query: (productData) => ({
        url: "client/products",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: build.mutation({
      query: ({ id, ...productData }) => ({
        url: `client/products/${id}`,
        method: "PUT",
        body: productData,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `client/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    getAds: build.query({
      query: () => "client/ads",
      providesTags: ["Ads"],
    }),
    createAd: build.mutation({
      query: (adData) => ({
        url: "client/ads",
        method: "POST",
        body: adData,
      }),
      invalidatesTags: ["Ads"],
    }),
    updateAd: build.mutation({
      query: ({ id, ...adData }) => ({
        url: `client/ads/${id}`,
        method: "PUT",
        body: adData,
      }),
      invalidatesTags: ["Ads"],
    }),
    deleteAd: build.mutation({
      query: (id) => ({
        url: `client/ads/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ads"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAdsQuery,
  useCreateAdMutation,
  useUpdateAdMutation,
  useDeleteAdMutation,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
