import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const fetchAuthMe = createAsyncThunk(
    "auth/fetchAuthMe",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/api/users/me");
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    isAuthenticated: false,
    data: null,
    loading: false,
    error: null,
};

const authMeSlice = createSlice({
    name: "authMe",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthMe.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchAuthMe.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});
export const authMeReducer = authMeSlice.reducer;