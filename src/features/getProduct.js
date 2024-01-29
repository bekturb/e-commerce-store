import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const fetchSingleProduct = createAsyncThunk(
    "get/singleProduct",
    async (productId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/products/get-product/${productId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
);

export const getSingleProductToUpdate = createAsyncThunk(
    "get/singleProductToUpdate",
    async (productId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/products/get-product-to-update/${productId}`);
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

const singleProductSlice = createSlice({
    name: "single-product",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleProduct.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchSingleProduct.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            })
            .addCase(getSingleProductToUpdate.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(getSingleProductToUpdate.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getSingleProductToUpdate.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});
export const productReducer = singleProductSlice.reducer;