import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const fetchSearchProducts = createAsyncThunk(
    "get/searchProducts",
    async (searchItem, { rejectWithValue }) => {
        try {
            const encodedSearchItem = encodeURIComponent(searchItem);
            const { data } = await axios.get(`/api/products/search/searchData/${encodedSearchItem}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
);

const initialState = {
    data: {},
    loading: false,
    error: null,
};

const searchProductsSlice = createSlice({
    name: "search-products",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchProducts.pending, (state) => {
                state.loading = true;
                state.data = {};
                state.error = null;
            })
            .addCase(fetchSearchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = {...action.payload};
                state.error = null;
            })
            .addCase(fetchSearchProducts.rejected, (state, action) => {
                state.loading = false;
                state.data = {};
                state.error = action.payload;
            });
    },
});
export const searchProductsReducer = searchProductsSlice.reducer;