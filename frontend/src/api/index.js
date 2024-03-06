import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataBaseQuery = createApi({
  reducerPath: "API",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getShops: builder.query({
      query: () => "shops",
    }),
    getProducts: builder.query({
      query: () => "products",
    }),
  }),
});

export const { useGetShopsQuery, useGetProductsQuery } = dataBaseQuery;
