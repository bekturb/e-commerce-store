import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/seller-axios-utils";

export const fetchMyShop = createAsyncThunk(
    "getMyShop",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get("/api/shops/me");
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateMyShop = createAsyncThunk(
    "updateMyShop",
    async (updatedShopData, { rejectWithValue }) => {
        try {
            const { data } = await axios.put("/api/shops/update/profile", updatedShopData);
            return {...data, ...updatedShopData};
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateMyShopAvatar = createAsyncThunk(
    "updateMyShopAvatar",
    async (avatar, { rejectWithValue }) => {
        console.log(avatar, "avatar");
        try {
            const { data } = await axios.put("/api/shops/update/profile-avatar", avatar);
            console.log(data, "data");
            return {...data, ...avatar};
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

const myShopSlice = createSlice({
    name: "authMyShop",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyShop.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyShop.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchMyShop.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.data = null;
                state.error = action.payload;
            })
            .addCase(updateMyShop.pending, (state) => {
                state.error = null;
            })
            .addCase(updateMyShop.fulfilled, (state, action) => {
                state.data = action.payload;
                state.error = null;
            })
            .addCase(updateMyShop.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(updateMyShopAvatar.fulfilled, (state, action) => {
                state.data = action.payload;
            })
    },
});
export const myShopReducer = myShopSlice.reducer;