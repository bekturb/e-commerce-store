import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";
import sellerAxios from "../utils/seller-axios-utils";

export const getUserConversations = createAsyncThunk(
    "get-user-conversations",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/api/conversations/get-user-conversations");
            return data.conversations;
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
);

export const getSellerConversations = createAsyncThunk(
    "get-seller-conversations",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await sellerAxios.get("/api/conversations/get-seller-conversations");
            return data.conversations;
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

const conversationsSlice = createSlice({
    name: "user-conversations",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getUserConversations.pending, (state) => {
                state.loading = true;
                state.data = [];
                state.error = null;
            })
            .addCase(getUserConversations.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getUserConversations.rejected, (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = action.payload;
            })
            .addCase(getSellerConversations.pending, (state) => {
                state.loading = true;
                state.data = [];
                state.error = null;
            })
            .addCase(getSellerConversations.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getSellerConversations.rejected, (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = action.payload;
            });
    },
});
export const conversationsReducer = conversationsSlice.reducer;