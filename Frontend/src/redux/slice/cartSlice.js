import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { products: [] };
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk(
  "cart/fetchCArt",
  async ({ userId, guestId }, { rejectWithValue }) => {
    // If both ids are missing, skip fetching
    if (!userId && !guestId) {
      return { products: [] };
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          params: { userId, guestId },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Add an item to the cart for a user or guest
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, size, color, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          productId,
          quantity,
          size,
          color,
          guestId,
          userId,
        }
      );

      return response.data;
    } catch (error) {
      console.error("Failed to add to cart:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Update the quantity of an item in the cart
export const updateCartItemQunatity = createAsyncThunk(
  "cart/updateCartItemQunatity",
  async (
    { productId, quantity, size, color, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          productId,
          quantity,
          size,
          color,
          guestId,
          userId,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Remove an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, size, color, guestId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        data: {
          productId,
          size,
          color,
          guestId,
          userId,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Merge guest cart into user cart
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        { guestId },
        {
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [] };
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      })

      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add to cart";
      })

      // Update cart item quantity
      .addCase(updateCartItemQunatity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQunatity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(updateCartItemQunatity.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to update item quantity";
      })

      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to remove item";
      })

      // Merge cart
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to merge cart";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
