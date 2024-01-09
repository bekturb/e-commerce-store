import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const fetchAuthShop = createAsyncThunk(
    "auth/fetchAuthShop",
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.post("/api/shop-login/auth", params);
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    data: null,
    loading: false,
    error: null,
};

const authShopSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthShop.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(fetchAuthShop.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchAuthShop.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});

export const checkShopAuth = (state) => Boolean(state?.auth?.data?.token);
export const authShopReducer = authShopSlice.reducer;
export const { logout }  = authShopSlice.actions;