import { configureStore } from "@reduxjs/toolkit";
import { dataBaseQuery } from "../api";
import { addressMapApi } from "../api/apiMap";

import basketSlice from "./sliceBasket";
import dataMap from "./sliceMapData";

const store = configureStore({
  reducer: {
    basketSlice: basketSlice,
    dataMap: dataMap,
    [dataBaseQuery.reducerPath]: dataBaseQuery.reducer,
    [addressMapApi.reducerPath]: addressMapApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      dataBaseQuery.middleware,
      addressMapApi.middleware
    ),
});

export default store;
