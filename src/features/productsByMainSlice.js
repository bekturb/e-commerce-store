import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const fetchProductsByCategory = createAsyncThunk(
    "auth/fetchProductsByCategory",
    async (slug, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/products/get-products/${slug}`);
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

const categoryProducts = createSlice({
    name: "CategoriesProducts",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});
export const categoryProductsReducer = categoryProducts.reducer;