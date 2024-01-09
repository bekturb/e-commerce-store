import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const verifyShopEmail = createAsyncThunk(
    "auth/fetchShopOtp",
    async (params, { rejectWithValue }) => {
        let keyToDelete = 'userId';
        let deletedItem = { [keyToDelete]: params[keyToDelete] };
        delete params[keyToDelete];

        try {
            const { data } = await axios.post(`/api/shops/${deletedItem.userId}/verify`, params);
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

const shopOtpSlice = createSlice({
    name: "shop-otp",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(verifyShopEmail.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(verifyShopEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(verifyShopEmail.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});

export const shopOtpReducer = shopOtpSlice.reducer;