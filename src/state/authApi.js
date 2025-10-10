// src/features/auth/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken, setUser } from "./authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://34.10.183.252/api",
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
          console.log("🚀 ~ onQueryStarted: ~ data:", data);

          dispatch(setToken(data.token));
          dispatch(setUser(data.payload));
          localStorage.setItem("accessToken", data.token);
          localStorage.setItem("userData", JSON.stringify(data.payload));
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
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authApi;
