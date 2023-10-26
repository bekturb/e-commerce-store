import { createSlice }  from"@reduxjs/toolkit"

const initialState = {
    showCart: false,
}

const cartSlice = createSlice({
    name: "miniCart",
    initialState,
    reducers: {
        showCart: (state, action) => {
            state.showCart = true
        },

        closeCart: (state, action) => {
            state.showCart = false
        },
    }
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;