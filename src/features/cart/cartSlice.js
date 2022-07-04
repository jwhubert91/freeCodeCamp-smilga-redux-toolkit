import { createSlice } from "@reduxjs/toolkit"
import cartItems from "../../cartItems"

const initialState = {
  cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state, action) => {
      return {
        cartItems: [],
        ...initialState,
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
    },
    increase: (state, action) => {
      const itemId = action.payload
      const cartItem = state.cartItems.find((item) => item.id === itemId)
      cartItem.amount += 1
    },
    decrease: (state, action) => {
      const itemId = action.payload
      const cartItem = state.cartItems.find((item) => item.id === itemId)
      cartItem.amount -= 1
    },
    calculateTotals: (state, action) => {},
  },
})

// console.log(cartSlice)
export const { clearCart, removeItem, increase, decrease } = cartSlice.actions

export default cartSlice.reducer
