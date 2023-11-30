import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

const initialState = {
    data: [],
    getReviewsLoading: false,
    postReviewLoading: false,
    getReviewsError: null,
    postReviewError: null,
};

export const getReviews = createAsyncThunk(
    "getReviews",
    async (productId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/products/${productId}/all-reviews`);
            return data;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
);

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

const allReviewsSlice = createSlice({
    name: "reviews",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getReviews.pending, (state) => {
                state.getReviewsLoading = true;
                state.data = [];
                state.getReviewsError = null;
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.getReviewsLoading = false;
                state.data = action.payload;
                state.getReviewsError = null;
            })
            .addCase(getReviews.rejected, (state, action) => {
                state.getReviewsLoading = false;
                state.data = [];
                state.getReviewsError = action.payload;
            })
            .addCase(postReviewData.pending, (state) => {
                state.postReviewLoading = true;
                state.postReviewError = null;
            })
            .addCase(postReviewData.fulfilled, (state, action) => {
                const newCmt = action.payload;
                const alreadyRatedIndex = state.data.findIndex((cmt) => cmt.postedBy._id === newCmt.postedBy._id);

                let newCmtData;

                if (alreadyRatedIndex !== -1) {
                    newCmtData = [...state.data];
                    newCmtData[alreadyRatedIndex] = newCmt;
                } else {
                    newCmtData = [...state.data, newCmt];
                }

                return {
                    ...state,
                    postReviewLoading: false,
                    data: newCmtData,
                    postReviewError: null,
                };
            })
            .addCase(postReviewData.rejected, (state, action) => {
                state.postReviewLoading = false;
                state.postReviewError = action.payload;
            });
    },
});

export const allReviewsReducer = allReviewsSlice.reducer;