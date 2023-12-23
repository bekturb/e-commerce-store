import { createSlice }  from"@reduxjs/toolkit"

const initialState = {
    query: "",
}

const searchProductsSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        saveSearchQuery: (state, action) => {
            state.query = action.payload
        },
    }
});

export default searchProductsSlice.reducer;
export const searchActions = searchProductsSlice.actions;