import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";
import sellerAxios from "../utils/seller-axios-utils"
import toast from "react-hot-toast";

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

export const getShopCoupons = createAsyncThunk(
    "get/shop-couponValue",
    async ( _, { rejectWithValue }) => {
        try {
            const { data } = await sellerAxios.get(`/api/coupon/get-all-shop-coupons`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteCoupon = createAsyncThunk(
    "delete/shop-couponValue",
    async ( orderId, { rejectWithValue }) => {
        try {
            const { data } = await sellerAxios.delete(`/api/coupon/delete/${orderId}`);
            return data;
        } catch (error) {
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
            })
            .addCase(getShopCoupons.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(getShopCoupons.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getShopCoupons.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            })
            .addCase(deleteCoupon.pending, () => {
                toast.loading("Deleting a product...")
            })
            .addCase(deleteCoupon.fulfilled, (state, action) => {
                state.data = state.data.filter(order => order._id !== action.payload?._id)
            })
            .addCase(deleteCoupon.rejected, (action) => {
                toast.error(action.payload?.data)
            })
    },
});
export const couponReducer = couponSlice.reducer;