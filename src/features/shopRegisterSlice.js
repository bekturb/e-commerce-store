import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const registerShop = createAsyncThunk(
    "auth/registerShop",
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/api/shops/register", params);
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

const shopRegisterSlice = createSlice({
    name: "register-shop",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(registerShop.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(registerShop.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(registerShop.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});

export const shopRegisterReducer = shopRegisterSlice.reducer;