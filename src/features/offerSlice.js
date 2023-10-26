import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const fetchOffer = createAsyncThunk(
    "auth/fetchOffer",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/api/events");
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const offerSlice = createSlice({
    name: "offers",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchOffer.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(fetchOffer.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchOffer.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});
export const offerReducer = offerSlice.reducer;