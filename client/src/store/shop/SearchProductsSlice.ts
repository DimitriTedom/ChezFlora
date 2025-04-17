import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../authSlice";

const initalState = {
  isLoading: false,
  searchResults: [],
  error: "",
};
export const getSearchResults = createAsyncThunk(
  "/search/getSearchResults",
  async (keyword: string) => {
    const result = await axios.get(`${API_URL}shop/search/${keyword}`);
    return result.data;
  }
);
const searchProductSlice = createSlice({
  name: "searchSlice",
  initialState: initalState,
  reducers: {
    resetProductSearchResults: (state) => {
      state.searchResults = [];
    },
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
      .addCase(getSearchResults.rejected, (state) => {
        state.isLoading = false;
        state.error = "An Erro Occured";
      });
  },
});
export const { resetProductSearchResults } = searchProductSlice.actions;
export default searchProductSlice.reducer;
