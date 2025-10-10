import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://34.10.183.252/api/kamarket",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Category"],
  endpoints: (build) => ({
    getCategory: build.query({
      query: () => "/category/all",
      providesTags: ["Category"],
    }),
    createCategory: build.mutation({
      query: (categoryData) => ({
        url: "/category/create",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: build.mutation({
      query: ({ id, ...categoryData }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
