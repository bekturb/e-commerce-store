import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/seller-axios-utils";
import {toast} from "react-hot-toast";

export const fetchProductData = createAsyncThunk(
    "auth/fetchProductData",
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/api/products", params);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProductData = createAsyncThunk(
    "uploadProductData",
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/api/products/update/${params.productId}`, params.formData);
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
                toast.error(action.payload)
            })
            .addCase(updateProductData.pending, (state) => {
                state.loading = true;
                state.data = [];
                state.error = null;
            })
            .addCase(updateProductData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(updateProductData.rejected, (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = action.payload;
                toast.error(action.payload)
            });
    },
});

export const productCreatingReducer = createProductSlice.reducer;