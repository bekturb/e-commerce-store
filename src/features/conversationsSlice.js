import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const getUserConversations = createAsyncThunk(
    "conversations/getUserConversations",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/api/conversations/get-user-conversations");
            return data.conversations;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const conversationsSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
        addConversation: (state, action) => {
            const conversation = action.payload;
            
            const findConv = state.data.find(conv => conv._id === conversation._id);            
            
            if (!findConv) {
                state.data.push(conversation);
            }else {
                state.data = state.data.map(conv => {
                    return conv._id === conversation._id ? {...conv, lastMessage: conversation?.lastMessage, lastMessageId: conversation?.lastMessageId} : conv
                })
            }
        }
    },
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
    },
});

export const conversationsReducer = conversationsSlice.reducer;
export const conversationActions = conversationsSlice.actions;
