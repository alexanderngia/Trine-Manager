import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "types/user";
export interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: null,
};
const productSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.user = action.payload;
    },
    clearProduct: (state) => {
      state.user = null;
    },

  },
});

//Action
export const productActions = productSlice.actions;
// Reducer
const productReducer = productSlice.reducer;
export default productReducer;
