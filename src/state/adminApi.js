import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://34.173.189.86/kamarket/kamarket/kamarket",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Admins"],
  endpoints: (build) => ({
    getAdmins: build.query({
      query: () => "user/admins",
      providesTags: ["Admins"],
    }),
    createAdmin: build.mutation({
      query: (data) => ({
        url: "user/admins",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admins"],
    }),
    updateAdmin: build.mutation({
      query: ({ id, ...data }) => ({
        url: `user/admins/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admins"],
    }),
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `user/admins/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admins"],
    }),
    toggleAdminStatus: build.mutation({
      query: ({ id, active }) => ({
        url: `user/admins/${id}/status`,
        method: "PATCH",
        body: { active },
      }),
      invalidatesTags: ["Admins"],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
  useToggleAdminStatusMutation,
} = adminApi;
