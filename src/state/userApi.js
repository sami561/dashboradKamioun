import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/kamarket",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => "user/customers",
      providesTags: ["Users"],
    }),
    createUser: build.mutation({
      query: (data) => ({
        url: "client/customers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: build.mutation({
      query: ({ id, ...data }) => ({
        url: `client/customers/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `client/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    getAdminCount: build.query({
      query: () => "user/admins/count",
      providesTags: ["Admin"],
    }),
    getCountCustomers: build.query({
      query: () => "user/customers/count",
      providesTags: ["Maneger"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useGetAdminCountQuery,
  useGetCountCustomersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
