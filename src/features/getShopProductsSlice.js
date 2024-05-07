import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sellerAxios from "../utils/seller-axios-utils";

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
            });
    },
});
export const shopProductsReducer = shopProductslice.reducer;