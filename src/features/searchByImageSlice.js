import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    searchImage: null
}

const searchByImageSlice = createSlice({
    name: "searchByImage",
    initialState,
    reducers: {
        setSearchImage: (state, action) => {
            state.searchImage = action.payload
        },

        deleteSearchImage: (state) => {
            state.searchImage = null
        }
    }
});

export const  {setSearchImage, deleteSearchImage} = searchByImageSlice.actions;
export default searchByImageSlice.reducer