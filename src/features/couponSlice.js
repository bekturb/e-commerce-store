import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const getCouponValue = createAsyncThunk(
    "get/couponValue",
    async (couponName, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/coupon/get-coupon-value/${couponName}`);
            return data;
        } catch (error) {
            console.log(error.response, "response");
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    data: null,
    loading: false,
    error: null,
};

const couponSlice = createSlice({
    name: "coupon",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getCouponValue.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(getCouponValue.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getCouponValue.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});
export const couponReducer = couponSlice.reducer;