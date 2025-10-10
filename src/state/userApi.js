import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["Users", "User", "AllUsers", "Admin", "Maneger", "AccountTypes"],
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
    getAccountTypeCounts: build.query({
      query: () => "user/account-type-counts",
      providesTags: ["AccountTypes"],
    }),
    getVendors: build.query({
      query: () => "user/vendors/all",
      providesTags: ["Vendors"],
    }),
    getOperationsTeam: build.query({
      query: () => "user/operations/all",
      providesTags: ["OperationsTeam"],
    }),
    getAllUsers: build.query({
      query: () => "user",
      providesTags: ["AllUsers"],
    }),
    activateUser: build.mutation({
      query: (id) => ({
        url: `user/${id}/activate`,
        method: "POST",
      }),
      invalidatesTags: ["AllUsers"],
    }),
    deactivateUser: build.mutation({
      query: (id) => ({
        url: `user/${id}/deactivate`,
        method: "POST",
      }),
      invalidatesTags: ["AllUsers"],
    }),
    updateUserProfile: build.mutation({
      query: ({ id, data }) => ({
        url: `user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["AllUsers"],
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: "user/updateUser",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getUser: build.query({
      query: (id) => `user/${id}`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetAllUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useGetAdminCountQuery,
  useGetCountCustomersQuery,
  useGetAccountTypeCountsQuery,
  useGetVendorsQuery,
  useGetOperationsTeamQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useActivateUserMutation,
  useDeactivateUserMutation,
  useUpdateUserProfileMutation,
  useUpdateProfileMutation,
} = userApi;
