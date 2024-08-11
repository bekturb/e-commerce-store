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

export const updateMyProfile = createAsyncThunk(
    "updateMyProfile",
    async (updatedUserData, { rejectWithValue }) => {
        try {
            const { data } = await axios.put("/api/users/update/profile", updatedUserData);
            return {...data, ...updatedUserData};
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateMyAvatar = createAsyncThunk(
    "updateMyAvatar",
    async (profilePicture, { rejectWithValue }) => {
        console.log(profilePicture, "avatar");
        try {
            const { data } = await axios.put("/api/users/update/profile-picture", profilePicture);
            console.log(data, "data");
            return {...data, ...profilePicture};
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    isAuthenticated: false,
    data: null,
    loading: true,
    error: null,
};

const authMeSlice = createSlice({
    name: "authMe",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthMe.pending, (state) => {
                state.loading = true;
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
            })
            .addCase(updateMyProfile.pending, (state) => {
                state.error = null;
            })
            .addCase(updateMyProfile.fulfilled, (state, action) => {
                state.data = action.payload;
                state.error = null;
            })
            .addCase(updateMyProfile.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateMyAvatar.fulfilled, (state, action) => {
                state.data = action.payload;
            });
    },
});
export const authMeReducer = authMeSlice.reducer;