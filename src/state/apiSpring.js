import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSpring = createApi({
  reducerPath: "SpringApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL_SPRING,
    prepareHeaders: (headers, { getState }) => {
      // Attempt to get the token from the Redux state (if it's stored there)
      const token = getState().auth.token; // Ensure this path to the token in the state is correct

      // If using localStorage instead, you might use:
      // const token = localStorage.getItem('token');

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "Governorate",
    "Bank",
    "CreditType",
    "Request",
    "Admin",
    "User",
    "Maneger",
  ],
  endpoints: (build) => ({
    getGovernorate: build.query({
      query: () => "api/v1/gouvernorat/all",
      providesTags: ["Governorate"],
    }),
    getBank: build.query({
      query: () => "api/v1/bank/all",
      providesTags: ["Bank"],
    }),
    getCreditType: build.query({
      query: () => "api/v1/credit-types/getall",
      providesTags: ["CreditType"],
    }),
    getRequest: build.query({
      query: () => "api/v1/request/all",
      providesTags: ["Request"],
    }),
    getAdmin: build.query({
      query: () => "api/v1/users/admins",
      providesTags: ["Admin"],
    }),
    getUser: build.query({
      query: () => "api/v1/users/users",
      providesTags: ["User"],
    }),
    getManeger: build.query({
      query: () => "api/v1/users/Mangers",
      providesTags: ["Maneger"],
    }),
    getUserCount: build.query({
      query: () => "api/v1/users/count-users",
      providesTags: ["User"],
    }),
    getAdminCount: build.query({
      query: () => "api/v1/users/count-admins",
      providesTags: ["Admin"],
    }),
    getCountManager: build.query({
      query: () => "api/v1/users/count-managers",
      providesTags: ["Maneger"],
    }),
    getallUserCount: build.query({
      query: () => "api/v1/users/count-by-role",
      providesTags: ["User"],
    }),
    getBankCount: build.query({
      query: () => "api/v1/bank/count",
      providesTags: ["Bank"],
    }),
  }),
});

export const {
  useGetGovernorateQuery,
  useGetBankQuery,
  useGetCreditTypeQuery,
  useGetRequestQuery,
  useGetAdminQuery,
  useGetUserQuery,
  useGetManegerQuery,
  useGetUserCountQuery,
  useGetAdminCountQuery,
  useGetCountManagerQuery,
  useGetallUserCountQuery,
  useGetBankCountQuery,
} = apiSpring;
