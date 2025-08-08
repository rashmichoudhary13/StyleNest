import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchProducts",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// async function to create a new product
export const createProduct = createAsyncThunk(
    "adminProducts/createProduct",
    async ({productData, token}) => {
        const responst = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/products}`,
            productData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response;
    }
);

// async thunk to update an existing product
export const updateProduct = createAsyncThunk(
  "adminProducts/updateProduct",
  async ({ id, productData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// async thunk to delete a product
export const deleteProduct = createAsyncThunk( 
    "adminProducts/deleteProduct",
    async ({id, token}, { rejectWithValue }) => {
        try {
        await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        return id;
        } catch (error) {
        return rejectWithValue(error.response.data);
        }
    }
    );

    const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: { 
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch admin products
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

            // Create product
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })

            // Update product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex(product => product._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })

            // Delete product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product._id !== action.payload);
            });
    }
});

export default adminProductSlice.reducer;