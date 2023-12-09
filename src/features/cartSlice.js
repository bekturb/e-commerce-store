import {createSlice} from "@reduxjs/toolkit"
import toast from "react-hot-toast";

const initialState = {
    data: [],
}

const cartProducts = createSlice({
    name: "cart",
    initialState,
    reducers: {
        getCartProducts: (state) => {
            const storedCartProducts = localStorage.getItem('cart');
            state.data = storedCartProducts ? JSON.parse(storedCartProducts) : []
        },

        setCartProducts: (state, action) => {
            state.data.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(state.data));
            toast.success('Product added to cart!');
        }
    }
});

export default cartProducts.reducer;
export const cartProductsActions = cartProducts.actions;