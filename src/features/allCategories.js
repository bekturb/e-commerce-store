import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const fetchAllCategories = createAsyncThunk(
    "auth/fetchAllCategories",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/api/categories/all");
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

const allCategoriesSlice = createSlice({
    name: "allCategories",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategories.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});
export const allCategoriesReducer = allCategoriesSlice.reducer;