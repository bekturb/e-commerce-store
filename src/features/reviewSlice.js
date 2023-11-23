import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const postReviewData = createAsyncThunk(
    "postReview",
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.put("/api/products/add-review", params);
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

const reviewSlice = createSlice({
    name: "postReview",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(postReviewData.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(postReviewData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(postReviewData.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});

export const reviewReducer = reviewSlice.reducer;