import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Product {
  productName: string;
  productPrice: number;
  ProductQuantity: number;
}

export interface AuthState {

  username: string | null;
  email: string | null;
  productcart: Product[] ;
}


const initialState: AuthState = {

  username: null,
  email: null,
  productcart: []

};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    addProductToCart: (state, action: PayloadAction<Product>) => {
      state.productcart?.push(action.payload);
    },
    removeProductFromCart: (state, action: PayloadAction<string>) => {
      state.productcart = state.productcart?.filter(
        (product) => product.productName !== action.payload
      );
    },

    cleanUp: (state) => {
      state.username = null;
      state.email = null;

    },
  }
})

export const {
  setUsername,
  setEmail,
  addProductToCart,
  removeProductFromCart,

  cleanUp,

} = authSlice.actions;

export default authSlice.reducer;