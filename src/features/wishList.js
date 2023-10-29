import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const addToWishList = createAsyncThunk(
    "auth/wishList",
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/api/products/wishlist`, params);
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

const wishListSlice = createSlice({
    name: "wishList",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addToWishList.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(addToWishList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(addToWishList.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});

export const wishListReducer = wishListSlice.reducer;