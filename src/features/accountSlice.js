import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const fetchAccount = createAsyncThunk(
    "auth/fetchAccount",
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/api/accounts", params);
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

const accountSlice = createSlice({
    name: "account",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAccount.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(fetchAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchAccount.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});
export const accountReducer = accountSlice.reducer;