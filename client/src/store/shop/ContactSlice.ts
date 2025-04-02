import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../authSlice';
import axios from 'axios';
interface SendResponse {
    success: boolean;
    message: string;
}
export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    subject: string;
    message: string;
}
interface ContactState {
    formData: ContactFormData;
    isLoading: boolean;
    isSuccess: boolean;
    error: string | null;
  }
const initialState: ContactState = {
  formData: {
    name: '',
    email: '',
    phone: '',
    address: '',
    subject: '',
    message: ''
  },
  isLoading: false,
  isSuccess: false,
  error: null
};

export const sendContactIssue = createAsyncThunk<
  SendResponse, // Return type
  ContactFormData, // Argument type
  { rejectValue: string } // Reject value type
>(
  'contact/sendContactIssue',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}shop/contact/send`, formData, { 
        withCredentials: true 
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Failed to send issue'
      );   
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers : (builder) =>{
      builder.addCase(sendContactIssue.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      });
        builder.addCase(sendContactIssue.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.isSuccess = true;
        state.formData = initialState.formData;
      });
        builder.addCase(sendContactIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isSuccess = false;
      });
  },
});




export default contactSlice.reducer;