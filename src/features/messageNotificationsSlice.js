import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shopMessageNotifications: [],
    clientMessageNotifications: [],
};

const messageNotificationsSlice = createSlice({
    name: "colors",
    initialState,
    reducers: {
        addShopMessNotifications: (state, action) => {
            state.shopMessageNotifications.push(action.payload)
        },
        addClientMessNotifications: (state, action) => {
            state.clientMessageNotifications.push(action.payload)
        },
        markUserNotificatiosAsRead: (state, action) => {
            const thisUserNotifications = action.payload;

            if (!thisUserNotifications.length) return;

            const nNotifications = state.clientMessageNotifications.map(c => {
                let notifications;

                thisUserNotifications.forEach(n => {
                    if(n.senderId === c.senderId){
                        notifications = {n, isRead: true}
                    }else {
                        notifications = c
                    }
                });

                return notifications
            });

            state.clientMessageNotifications = nNotifications;
        },
        markShopNotificatiosAsRead: (state, action) => {
            const thisUserNotifications = action.payload;

            if (!thisUserNotifications.length) return;

            const nNotifications = state.shopMessageNotifications.map(c => {
                let notifications;

                thisUserNotifications.forEach(n => {
                    if(n.senderId === c.senderId){
                        notifications = {n, isRead: true}
                    }else {
                        notifications = c
                    }
                });

                return notifications
            });

            state.shopMessageNotifications = nNotifications;
        }
    }
});
export const messageNotificationsReducer = messageNotificationsSlice.reducer;
export const messageNotificationsActions = messageNotificationsSlice.actions;