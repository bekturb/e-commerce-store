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
            state.data = storedCartProducts ? JSON.parse(storedCartProducts) : [];
        },

        setCartProducts: (state, action) => {
            state.data.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(state.data));
            toast.success('Product added to cart!');
        },

        deleteCartProduct: (state, action) => {
            const productId = action.payload;
            state.data = state.data.filter((el) => el.variantId !== productId);

            localStorage.setItem('cart', JSON.stringify([...state.data]));
            toast.success('Product removed from cart!');
        },

        addQuantity: (state, action) => {
            const productId = action.payload;
            state.data.forEach((el) => {
                if (el.variantId === productId && el.quantity < el.proQty) {
                    el.quantity += 1;
                }
            });

            localStorage.setItem('cart', JSON.stringify([...state.data]));
        },

        decreaseQuantity: (state, action) => {
            const productId = action.payload;
            state.data.forEach((el) => {
                if (el.variantId === productId && el.quantity > 1) {
                    el.quantity -= 1;
                }
            });

            localStorage.setItem('cart', JSON.stringify([...state.data]));
        },
    }
});

export default cartProducts.reducer;
export const cartProductsActions = cartProducts.actions;