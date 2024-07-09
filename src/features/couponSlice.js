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
            return rejectWithValue(error.response.data);
        }
    }
);

export const createCoupon = createAsyncThunk(
    "create/coupon-value",
    async (newCoupon, { rejectWithValue }) => {
        try {
            const { data } = await sellerAxios.post("/api/coupon", newCoupon);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCoupon = createAsyncThunk(
    "update/coupon-value",
    async (newCoupon, { rejectWithValue }) => {
        const {couponId} = newCoupon;
        delete newCoupon.couponId;

        try {
            const { data } = await sellerAxios.put(`/api/coupon/update-coupon/${couponId}`, newCoupon);
            return data;
        } catch (error) {
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
            .addCase(createCoupon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCoupon.fulfilled, (state, action) => {
                state.loading = false;
                state.data.push(action.payload);
                state.error = null;
            })
            .addCase(createCoupon.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCoupon.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCoupon.fulfilled, (state, action) => {
                const newCoupon = action.payload;
                const findCouponIndex = state.data.findIndex(c => c._id === newCoupon._id);

                state.loading = false;

                if(findCouponIndex !== -1) {
                    state.data[findCouponIndex] = newCoupon;
                }

                state.error = null;
            })
            .addCase(updateCoupon.rejected, (state, action) => {
                state.loading = false;
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