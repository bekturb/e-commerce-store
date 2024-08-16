import {  createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";
import sellerAxios from "../utils/seller-axios-utils";
import toast from "react-hot-toast";

export const getAllMessages = createAsyncThunk(
    "get-all-messages", 
    async (conversationId, {rejectWithValue}) => {
        try {
            const {data} = await axios.get(`/api/messages/get-all-messages/${conversationId}`);
            return data.messages
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }       
);

export const createMessage = createAsyncThunk(
    "create-message", 
    async (messageData, {rejectWithValue}) => {
        try {
            const {data} = await axios.post("/api/messages/create/", messageData);
            return data.message
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }       
);

export const createSellerMessage = createAsyncThunk(
    "create-seller-message", 
    async (messageData, {rejectWithValue}) => {
        try {
            const {data} = await sellerAxios.post("/api/messages/create/", messageData);
            return data.message
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }       
);

const initialState = {
    newMessage: "",
    data: [],
    loading: false,
    error: null,
    creatingLoading: false,
    createdError: null
};

const createMessagesSlice = createSlice({
    name: "get-messages",
    initialState,
    reducers: {
        handleChangeMessage: (state, action) => {
            state.newMessage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllMessages.pending, (state) => {
                state.loading = true;
                state.data = [];
                state.error = null;
            })
            .addCase(getAllMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(getAllMessages.rejected, (state, action) => {
                state.loading = false;
                state.data = [];
                state.error = action.payload;
            })
            .addCase(createMessage.pending, (state) => {
                state.creatingLoading = true;
                state.createdError = null;
            })
            .addCase(createMessage.fulfilled, (state, action) => {
                state.creatingLoading = false;
                state.data.push(action.payload);
                state.createdError = null;
            })
            .addCase(createMessage.rejected, (state, action) => {
                state.creatingLoading = false;
                state.createdError = action.payload;
                toast.error(action.payload);
            })
            .addCase(createSellerMessage.pending, (state) => {
                state.creatingLoading = true;
                state.createdError = null;
            })
            .addCase(createSellerMessage.fulfilled, (state, action) => {
                state.creatingLoading = false;
                state.data.push(action.payload);
                state.createdError = null;
            })
            .addCase(createSellerMessage.rejected, (state, action) => {
                state.creatingLoading = false;
                state.createdError = action.payload;
                toast.error(action.payload);
            })
    },
});

export const messageReducer = createMessagesSlice.reducer;
export const messageActions = createMessagesSlice.actions;