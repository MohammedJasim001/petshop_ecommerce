// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { toast } from 'sonner';

// export const fetchCartData = createAsyncThunk('cart/fetchCartData', async (userId) => {
//   const response = await axios.get(`http://localhost:3000/users/${userId}`);
//   const cart = response.data.cart;

//   const cartWithCount = Object.values(cart).map((item) => ({
//     ...item,
//     count: item.count || 1,
//   }));

//   return cartWithCount;
// });

// export const addToCartAsync = createAsyncThunk('cart/addToCart', async ({ userId, item }) => {
//   const response = await axios.get(`http://localhost:3000/users/${userId}`);
//   const cart = response.data.cart;

//   const itemExists = Object.values(cart).some((cartItem) => cartItem.id === item.id);
//   if (itemExists) {
//     toast.warning('Item already exists in the cart');
//     return Object.values(cart);
//   }

//   const updatedCart = { ...cart, [item.id]: { ...item, count: 1 } }; 
//   await axios.patch(`http://localhost:3000/users/${userId}`, { cart: updatedCart });
//   toast.success('Item added to cart');

//   return Object.values(updatedCart);
// });

// export const removeFromCartAsync = createAsyncThunk('cart/removeFromCart', async ({ userId, itemId }) => {
//   const response = await axios.get(`http://localhost:3000/users/${userId}`);
//   const cart = response.data.cart;
//   const { [itemId]: removedItem, ...newCart } = cart;

//   await axios.patch(`http://localhost:3000/users/${userId}`, { cart: newCart });
//   toast.success('Item removed from cart');
  
//   return Object.values(newCart);
// });

// // Initial state
// const initialState = {
//   cartItems: [],
//   totalItems: 0,
//   totalPrice: 0,
//   status: 'idle',
//   error: null,
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     increaseItemCount: (state, action) => {
//       const item = state.cartItems.find((item) => item.id === action.payload);
//       if (item) {
//         item.count += 1;
//         state.totalItems += 1;
//         state.totalPrice += item.price;
//       }
//     },
//     decreaseItemCount: (state, action) => {
//       const item = state.cartItems.find((item) => item.id === action.payload);
//       if (item && item.count > 1) {
//         item.count -= 1;
//         state.totalItems -= 1;
//         state.totalPrice -= item.price;
//       }
//     },
//     updateCartItems: (state, action) => {
//       state.cartItems = action.payload;
//       state.totalItems = state.cartItems.reduce((acc, item) => acc + item.count, 0);
//       state.totalPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.count, 0);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCartData.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchCartData.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.cartItems = action.payload;
//         state.totalItems = state.cartItems.reduce((acc, item) => acc + item.count, 0);
//         state.totalPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.count, 0);
//       })
//       .addCase(fetchCartData.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(addToCartAsync.fulfilled, (state, action) => {
//         state.cartItems = action.payload;
//         state.totalItems = state.cartItems.reduce((acc, item) => acc + item.count, 0);
//         state.totalPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.count, 0);
//       })
//       .addCase(removeFromCartAsync.fulfilled, (state, action) => {
//         state.cartItems = action.payload;
//         state.totalItems = state.cartItems.reduce((acc, item) => acc + item.count, 0);
//         state.totalPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.count, 0);
//       });
//   },
// });

// export const { increaseItemCount, decreaseItemCount, updateCartItems } = cartSlice.actions;
// export default cartSlice.reducer;
