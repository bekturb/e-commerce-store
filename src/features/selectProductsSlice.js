import { createSlice } from "@reduxjs/toolkit";

const selectedProducts = {
    data: [],
}

const selectedProductsSlice = createSlice({
    name: "select-products",
    initialState: selectedProducts,
    reducers: {
        toggleProductSelection: (state, action) => {
            const productId = action.payload;
            const index = state.data.findIndex(prod => prod === productId);
            if (index !== -1) {
                state.data.splice(index, 1);
            } else {
                state.data.push(productId);
            }
        },
        toggleAllProdSelections: (state, action) => {
            if(state.data.length) {
                state.data = []
            }else {
                state.data = action.payload
            }
        },
        resetAllProdSelections: (state) => {
            state.data = []
        }
    }
});

export default selectedProductsSlice.reducer;
export const selectedProductsActions = selectedProductsSlice.actions;