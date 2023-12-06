import { createSlice }  from"@reduxjs/toolkit"

const initialState = {
    productBrand: [],
    productColor: [],
    productShop: [],
    productSort: "",
    productMinPrice: 0,
    productMaxPrice: 100000,
    currentPage: 1,
    perPage: "10",
}

const productFilterSlice = createSlice({
    name: "filterProducts",
    initialState,
    reducers: {
        setProductBrand: (state, action) => {

            const findItem = state.productBrand.indexOf(action.payload);

            if (findItem !== -1) {
                state.productBrand = state.productBrand.filter((item) => item !== action.payload);
            } else {
                state.productBrand.push(action.payload)
            }
        },
        setProductColor: (state, action) => {

            const findItem = state.productColor.indexOf(action.payload);

            if (findItem !== -1) {
                state.productColor = state.productColor.filter((item) => item !== action.payload);
            } else {
                state.productColor.push(action.payload)
            }
        },
        setProductShop: (state, action) => {
            const findItem = state.productShop.indexOf(action.payload);

            if (findItem !== -1) {
                state.productShop = state.productShop.filter((item) => item !== action.payload);
            } else {
                state.productShop.push(action.payload)
            }
        },
        setProductSort: (state, action) => {
            state.productSort = action.payload;
        },

        setProductMaxPrice: (state, action) => {
            state.productMaxPrice = action.payload;
        },

        setProductMinPrice: (state, action) => {
            state.productMinPrice = action.payload;
        },

        setPerPage: (state, action) => {
            state.perPage = action.payload;
        },
    }
});

export default productFilterSlice.reducer;
export const filterProductsActions = productFilterSlice.actions;