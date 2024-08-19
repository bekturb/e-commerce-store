import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    onlineUsers: null,
    online: []
};

const onlineUsersSlice = createSlice({
    name: "online-users",
    initialState,
    reducers: {
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        
        checkOnlineUsers: (state, action) => {
            const {conversation} = action.payload;
            const {userId} = action.payload;
            const {onlineUsers} = action.payload

            const chatMember = conversation?.members?.find(conv => conv !== userId); 
            const online = onlineUsers?.find(onlineUser => onlineUser.userId === chatMember);

            if(online) {
                state.online.push(online.userId)
            }
        }
    }
});

export const onlineUserReducer = onlineUsersSlice.reducer;
export const onlineUserActions = onlineUsersSlice.actions;