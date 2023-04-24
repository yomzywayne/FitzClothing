import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {

      let product = state.products.find((product) => product._id === action.payload._id);
      if (product) {
        product.quantity += action.payload.quantity;
      }        
      else {
        state.products.push(action.payload);
      }
      state.quantity += action.payload.quantity;
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      const productIndex = action.payload;
      const productToRemove = state.products[productIndex];
      state.quantity -= productToRemove.quantity;
      state.total -= productToRemove.price * productToRemove.quantity;
      state.products = state.products.filter(
        (product, index) => index !== productIndex
      );
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
  },
});

export const { addProduct, removeProduct, clearCart, setQuantity } = cartSlice.actions;
export default cartSlice.reducer;
