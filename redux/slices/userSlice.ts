import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
  product: {
    _id: string;
    // Add other product fields as necessary
  };
  // Add other fields as necessary
}

interface WishItem {
  product: {
    _id: string;
    // Add other product fields as necessary
  };
  // Add other fields as necessary
}

interface User {
  name: string;
  cartItems: CartItem[];
  wishItems: WishItem[];
}

interface UserState {
  user: User | null;
  status: string;
  currency: string;
}

// Initial state with types
const initialState: UserState = {
  user: null,
  status: "Unauthenticated",
  currency: "Naira",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SetCurrency: (state, action) => {
      state.currency = action.payload; 
    },
    SetUser: (state, action) => {
      state.user = action.payload;
      state.status="Authenticated"
    },
    SetExpired: (state, action) => { 
      state.status=action.payload
    }, 
    AddToCart: (state, action) => { 
      if (state.user) { // Check if state.user is not null
        state.user.cartItems = [...state.user.cartItems, action.payload];
      }
    }, 
    RemoveFromCart: (state, action) => { 
      if (state.user) { // Check if state.user is not null
        state.user.cartItems=state.user.cartItems.filter(val=>val.product._id.toString()!==action.payload)
      } 
    },
    AddToWish: (state, action) => { 
      if(state.user){
        state.user.wishItems=[...state.user.wishItems,action.payload]
      } 
    }, 
    RemoveFromWish: (state, action) => { 
      if(state.user){
        state.user.wishItems=state.user.wishItems.filter(val=>val.product._id.toString()!==action.payload)
      }
    },
  },
});

export const { SetUser , SetExpired,AddToCart,RemoveFromCart,AddToWish,RemoveFromWish,SetCurrency } = userSlice.actions;

export default userSlice.reducer;