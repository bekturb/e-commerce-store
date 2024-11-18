import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sellerAxios from "../utils/seller-axios-utils";

export const getSellerConversations = createAsyncThunk(
    "conversations/getSellerConversations",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await sellerAxios.get("/api/conversations/get-seller-conversations");
            return data.conversations;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

export const updateLastMessage = createAsyncThunk(
    "conversations/updateLastMessage",
    async (lastMessageData, { rejectWithValue }) => {
        try {
            const { data } = await sellerAxios.put(`/api/conversations/update-last-message/${lastMessageData.id}`, lastMessageData?.messages);
            return { ...data.conversation, ...lastMessageData?.messages };
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

const sellerConversationsSlice = createSlice({
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
            })
            .addCase(updateLastMessage.fulfilled, (state, action) => {                            
                const findConversation = state.data.find(conv => conv._id === action.payload._id);

                if (findConversation) {
                    findConversation.lastMessage = action.payload.lastMessage;
                    findConversation.lastMessageId = action.payload.lastMessageId;
                }
            });
    },
});

export const sellerConversationsReducer = sellerConversationsSlice.reducer;
export const sellerConversationActions = sellerConversationsSlice.actions;
