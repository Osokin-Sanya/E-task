import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addressMapApi = createApi({
  reducerPath: "addressMapApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nominatim.openstreetmap.org/",
  }),
  endpoints: (builder) => ({
    getAddressFromCoordinates: builder.query({
      query: ({ lat, lng }) => `reverse?format=json&lat=${lat}&lon=${lng}`,
    }),
  }),
});

export const { useGetAddressFromCoordinatesQuery } = addressMapApi;
