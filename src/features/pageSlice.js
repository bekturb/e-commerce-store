import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const fetchPages = createAsyncThunk(
    "auth/fetchPages",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/api/pages");
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

const pageSlice = createSlice({
    name: "pages",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchPages.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(fetchPages.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchPages.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});
export const pagesReducer = pageSlice.reducer;