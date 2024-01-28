import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/seller-axios-utils";

export const fetchProductData = createAsyncThunk(
    "auth/fetchProductData",
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/api/products", params);
            console.log(data, "data")
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const createProductSlice = createSlice({
    name: "create-product",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductData.pending, (state) => {
                state.loading = true;
                state.data = [];
                state.error = null;
            })
            .addCase(fetchProductData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchProductData.rejected, (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = action.payload;
            });
    },
});

export const productCreatingReducer = createProductSlice.reducer;