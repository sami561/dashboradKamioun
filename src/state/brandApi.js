import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://apigateway:3000/kamarket",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Brand"],
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => "brand/all",
      providesTags: ["Brand"],
    }),
    createBrand: builder.mutation({
      query: (formData) => ({
        url: "brand/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Brand"],
    }),
    updateBrand: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `brand/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Brand"],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
