import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const fetchStripeApi = createAsyncThunk(
    "auth/fetchStripeApi",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/api/payment/stripe-apikey");
            return data;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
);

const initialState = {
    data: null,
    loading: false,
    error: null,
};

const stripeApiSlice = createSlice({
    name: "stripe",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchStripeApi.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(fetchStripeApi.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchStripeApi.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});
export const stripeReducer = stripeApiSlice.reducer;