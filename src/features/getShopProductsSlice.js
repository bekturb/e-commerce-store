import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sellerAxios from "../utils/seller-axios-utils";
import {toast} from "react-hot-toast";

export const fetchShopProducts = createAsyncThunk(
    "get/shop-products",
    async (shopId, { rejectWithValue }) => {
        try {
            const { data } = await sellerAxios.get(`/api/products/get-shop-products/${shopId}`);
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

const shopProductslice = createSlice({
    name: "shop-products",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchShopProducts.pending, (state) => {
                state.loading = true;
                state.data = [];
                state.error = null;
            })
            .addCase(fetchShopProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchShopProducts.rejected, (state, action) => {
                state.loading = false;
                state.data = [];
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
export const shopProductsReducer = shopProductslice.reducer;