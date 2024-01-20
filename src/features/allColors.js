import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const fetchColors = createAsyncThunk(
    "fetch/colors",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/api/colors/all");
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

const colorsSlice = createSlice({
    name: "colors",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchColors.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(fetchColors.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchColors.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});
export const colorsReducer = colorsSlice.reducer;