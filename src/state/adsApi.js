import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adsApi = createApi({
  reducerPath: "adsApi",
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
  tagTypes: ["Ads"],
  endpoints: (build) => ({
    getAds: build.query({
      query: () => ({
        url: "http://34.10.183.252/api/oms/api/screen/all",
        method: "GET",
      }),
      providesTags: ["Ads"],
    }),
    createScreen: build.mutation({
      query: (data) => ({
        url: "http://34.10.183.252/api/oms/api/screen/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Ads"],
    }),
    getAdById: build.query({
      query: (id) => `ads/${id}`,
      providesTags: ["Ads"],
    }),
    createAd: build.mutation({
      query: (data) => ({
        url: "ads",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Ads"],
    }),
    updateAd: build.mutation({
      query: ({ id, ...data }) => ({
        url: `ads/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Ads"],
    }),
    deleteAd: build.mutation({
      query: (id) => ({
        url: `ads/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ads"],
    }),
    getAdsCount: build.query({
      query: () => "ads/count",
      providesTags: ["Ads"],
    }),
    getAdsByStatus: build.query({
      query: (status) => `ads/status/${status}`,
      providesTags: ["Ads"],
    }),
  }),
});

export const {
  useGetAdsQuery,
  useGetAdByIdQuery,
  useCreateAdMutation,
  useUpdateAdMutation,
  useDeleteAdMutation,
  useGetAdsCountQuery,
  useGetAdsByStatusQuery,
  useCreateScreenMutation,
} = adsApi;
