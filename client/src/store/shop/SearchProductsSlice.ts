import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initalState = {
    isLoading: false,
    searchResults: [],
    error: null,
}
export const getSearchResults = createAsyncThunk(
    "/search/getSearchResults",
    async (keyword:string) => {
      const result = await axios.get(
        `http://localhost:5000/api/shop/search/${keyword}`
      );
      return result.data;
    }
  );
const searchProductSlice = createSlice({
    name: "searchSlice",
    initialState: initalState,
    reducers: {
        resetProductSearchResults: (state)=>{
            state.searchResults = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSearchResults.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSearchResults.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResults = action.payload.data;
            })
            .addCase(getSearchResults.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },  
});
export const {resetProductSearchResults} = searchProductSlice.actions;
export default searchProductSlice.reducer;