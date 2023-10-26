import { createSlice }  from"@reduxjs/toolkit"

const initialState = {
    showMenu: false,
}

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        showMenu: (state, action) => {
            state.showMenu = true
        },

        closeMenu: (state, action) => {
            state.showMenu = false
        },
    }
});

export default menuSlice.reducer;
export const menuActions = menuSlice.actions;