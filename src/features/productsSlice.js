import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";
import sellerAxios from "../utils/seller-axios-utils";
import {toast} from "react-hot-toast";

export const fetchProducts = createAsyncThunk(
    "auth/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/api/products");
            return data;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
);

export const deleteProductData = createAsyncThunk(
    "deleteProductData",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await sellerAxios.delete(`/api/products/delete/${id}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
);

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            })
            .addCase(deleteProductData.pending, () => {
                toast.loading("Deleting a product...")
            })
            .addCase(deleteProductData.fulfilled, (state, action) => {
                state.data = state.data.filter(pro => pro._id !== action.payload?._id)
            })
            .addCase(deleteProductData.rejected, (state, action) => {
                toast.error(action.payload?.data)
            });
    },
});
export const productsReducer = productSlice.reducer;