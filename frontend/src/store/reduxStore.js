import { configureStore, createSlice } from "@reduxjs/toolkit";

//initial state and slice of cart list
const cartInitialState = {
  listItem: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    updateCart: (state, action) => {
      const indexItem = state.listItem.findIndex(
        (item) => item._id === action.payload._id
      );
      if (indexItem === -1) {
        state.listItem.push(action.payload);
      } else {
        const updatedCart = [...state.listItem];
        updatedCart[indexItem] = action.payload;
        state.listItem = updatedCart;
      }
    },
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});
export const cartActions = cartSlice.actions;
export default store;
