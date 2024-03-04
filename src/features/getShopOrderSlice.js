import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const getShopOrder = createAsyncThunk(
    "get/shopOrder",
    async ( shopId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/orders/get-seller-all-orders/${shopId}`);
            return data.orders;
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

const getShopOrderSlice = createSlice({
    name: "shop-order",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getShopOrder.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(getShopOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getShopOrder.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});
export const shopOrderReducer = getShopOrderSlice.reducer;