import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

const initialState = {
    data: [],
    loading: false,
    error: null,
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
    name: "allReviews",
    initialState,
    reducers: {},
    extraReducers:  {
        [getReviews.pending] : (state) => {
            state.loading = true;
            state.data = [];
            state.error = null;
        },
        [getReviews.fulfilled] : (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        [getReviews.rejected] : (state, action) => {
            state.loading = false;
            state.data = [];
            state.error = action.payload;
        },
        [postReviewData.pending] : (state) => {
            state.loading = true;
            state.error = null;
        },
        [postReviewData.fulfilled]: (state, action) => {
            const newCmt = action.payload;
            const alreadyRatedIndex = state.data.findIndex(cmt => cmt.postedBy._id === newCmt.postedBy._id);

            let newCmtData;

            if (alreadyRatedIndex !== -1) {
                newCmtData = [...state.data];
                newCmtData[alreadyRatedIndex] = newCmt;
            } else {
                newCmtData = [...state.data, newCmt];
            }

            return {
                ...state,
                loading: false,
                data: newCmtData,
                error: null,
            };
        },
        [postReviewData.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});
export const allReviewsReducer = allReviewsSlice.reducer;