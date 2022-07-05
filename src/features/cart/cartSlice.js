import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const CART_URL = "https://course-api.com/react-useReducer-cart-project"

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
}

export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
  return fetch(CART_URL)
    .then((res) => res.json())
    .catch((err) => console.error(err))
})

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state, action) => {
      state.cartItems = []
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
    calculateTotals: (state, action) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action)
      state.isLoading = false
      state.cartItems = action.payload
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = true
    },
  },
})

// console.log(cartSlice)
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions

export default cartSlice.reducer
