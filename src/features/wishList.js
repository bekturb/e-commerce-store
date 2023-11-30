import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const getPersonalWishlist = createAsyncThunk(
    "auth/wishlist",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/api/products/get-personal/wishlist");
            return data;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
);

export const addToWishList = createAsyncThunk(
    "auth/getWishlist",
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
    data: [],
    loading: false,
    error: null,
};

const wishListSlice = createSlice({
    name: "wishlist",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getPersonalWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPersonalWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getPersonalWishlist.rejected, (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = action.payload;
            })
            .addCase(addToWishList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToWishList.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(addToWishList.rejected, (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = action.payload;
            });
    },
});
export const wishListReducer = wishListSlice.reducer;