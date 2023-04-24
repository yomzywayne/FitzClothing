import { createSlice } from "@reduxjs/toolkit";

const selectedProductSlice = createSlice({
  name: "selectedProduct",
  initialState: {
    currentProduct: null,
  },
  reducers: {
    addSelectedProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
  },
});

export const { addSelectedProduct } = selectedProductSlice.actions;
export default selectedProductSlice.reducer;