// src/redux/features/imageUploadSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ImageUploadState {
  imageUrl: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ImageUploadState = {
  imageUrl: '',
  status: 'idle',
  error: null,
};

export const uploadImage = createAsyncThunk(
  'admin/products/upload-image',
  async (file: File) => {
    const formData = new FormData();
    formData.append('my_file', file);
    
    const response = await axios.post(
      'http://localhost:5000/api/admin/products/upload-image',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    console.log(response);
    return response.data;
  }
);

const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action)
        state.imageUrl = action.payload.data.url; // Accéder à data.url
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Upload failed';
      });
  },
});

export default imageUploadSlice.reducer;