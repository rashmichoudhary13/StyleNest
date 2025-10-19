import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const SubscribeEmail = createAsyncThunk(
  "subscribe/NewsLetterSubscribing",
  async (email, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/subscribe`,
        {email},
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
  }
);
const subscribeSlice = createSlice({
  name: "subscribe",
  initialState: {
    message: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
     .addCase(SubscribeEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
     })
     .addCase(SubscribeEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
     })
     .addCase(SubscribeEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Cannot Subscribe NewsLetter"
     })
  }
});

export default subscribeSlice.reducer;
