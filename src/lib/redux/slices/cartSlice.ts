import { CartItem } from '@/types/definition';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CartState {
  items: CartItem[];
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<{ cartItems: CartItem[] }>) => {
      state.items = action.payload.cartItems;
      state.totalQuantity = action.payload.cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
      );
    },
    increment: (state, action: PayloadAction<{ productId: number }>) => {
      const targetItem = state.items.find((item) => item.id === action.payload.productId);
      if (targetItem) {
        targetItem.quantity += 1;
        state.totalQuantity += 1;
      } else {
        state.items.push({ id: action.payload.productId, quantity: 1 });
        state.totalQuantity += 1;
      }
    },
    decrement: (state, action: PayloadAction<{ productId: number }>) => {
      const targetItem = state.items.find((item) => item.id === action.payload.productId);
      if (!targetItem) return;
      if (targetItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload.productId);
      } else {
        targetItem.quantity -= 1;
      }
      state.totalQuantity -= 1;
    },
  },
});

export const { setCartItems, increment, decrement } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
