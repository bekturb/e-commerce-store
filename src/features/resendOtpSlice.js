import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils/axios-utils";

export const resendOtpNumber = createAsyncThunk(
    "auth/resendOtp",
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/users/${params.userId}/resend-otp`);
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

const resendOtpSlice = createSlice({
    name: "resendOtp",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(resendOtpNumber.pending, (state) => {
                state.loading = true;
                state.data = null;
                state.error = null;
            })
            .addCase(resendOtpNumber.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(resendOtpNumber.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload;
            });
    },
});
export const resendOtpReducer = resendOtpSlice.reducer;