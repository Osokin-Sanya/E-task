import { createSlice } from "@reduxjs/toolkit";

const dataMap = createSlice({
  name: "dataMap",
  initialState: {
    address: "",
  },
  reducers: {
    setAddress(state, action) {
      state.address = action.payload;
    },
  },
});

export const { setAddress } = dataMap.actions;
export default dataMap.reducer;
