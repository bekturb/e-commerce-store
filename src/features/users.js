import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const fetchUsers = createAsyncThunk(
    "auth/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/api/users");
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

const userSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            })
    },
});

export const usersReducer = userSlice.reducer;