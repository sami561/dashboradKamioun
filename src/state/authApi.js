// src/features/auth/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "./authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://http://34.173.189.86/kamarket/kamarket/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: "/kamarket/auth/login/email",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.token));
          localStorage.setItem("accessToken", data.token);
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
    register: build.mutation({
      query: (credentials) => ({
        url: "/kamarket/auth/register/email",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          console.error("register failed:", error);
        }
      },
    }),
    logout: build.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
      onQueryStarted: async (arg, { dispatch }) => {
        dispatch(setToken(null)); // Clear the token on logout
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authApi;
