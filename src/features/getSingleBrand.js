import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const fetchSingleBrand = createAsyncThunk(
    "get/singleBrand",
    async (brandId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/brands/get-single-brand/${brandId}`);
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

const singleBrandSlice = createSlice({
    name: "single-brand",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleBrand.pending, (state) => {
                state.loading = true;
                state.data = [];
                state.error = null;
            })
            .addCase(fetchSingleBrand.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchSingleBrand.rejected, (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = action.payload;
            });
    },
});
export const brandReducer = singleBrandSlice.reducer;