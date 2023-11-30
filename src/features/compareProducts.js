import {createSlice} from "@reduxjs/toolkit"
import toast from "react-hot-toast";

const initialState = {
    data: [],
}

const compareProducts = createSlice({
    name: "compareProducts",
    initialState,
    reducers: {
        getCompareProducts: (state) => {
            const storedCompareProducts = localStorage.getItem('compareProducts');
            state.data = storedCompareProducts ? JSON.parse(storedCompareProducts) : []
        },

        setCompareProducts: (state, action) => {
            const productId = action.payload._id
            const productIndex = state.data.findIndex(el => el._id === productId);

            if (productIndex !== -1) {
                state.data = state.data.filter(el => el._id !== productId);
                toast.success('Product deleted from comparison!');
            }else {
                state.data.push(action.payload);
                toast.success('Product added to comparison!');
            }

            localStorage.setItem("compareProducts", JSON.stringify(state.data));
        }
    }
});

export default compareProducts.reducer;
export const compareProductsActions = compareProducts.actions;