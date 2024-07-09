import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sellerAxios from "../utils/seller-axios-utils";

export const fetchSingleCoupon = createAsyncThunk(
    "get/singleCoupon",
    async (couponId, { rejectWithValue }) => {
        try {
            const { data } = await sellerAxios.get(`/api/coupon/get-single-coupon/${couponId}`);
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

const singleCouponSlice = createSlice({
    name: "single-coupon",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleCoupon.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(fetchSingleCoupon.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchSingleCoupon.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});
export const singleCouponReducer = singleCouponSlice.reducer;