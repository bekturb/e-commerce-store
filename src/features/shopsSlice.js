import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const getAllShops = createAsyncThunk(
    "get/shops",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/api/shops/get-all");
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

const shopsSlice = createSlice({
    name: "shops",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllShops.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(getAllShops.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getAllShops.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});
export const shopsReducer = shopsSlice.reducer;