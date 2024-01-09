import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/seller-axios-utils";

export const fetchMyShop = createAsyncThunk(
    "getMyShop",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/api/shops/me");
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    isAuthenticated: false,
    data: null,
    loading: true,
    error: null,
};

const myShopSlice = createSlice({
    name: "authMyShop",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyShop.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyShop.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchMyShop.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});
export const myShopReducer = myShopSlice.reducer;