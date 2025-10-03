// src/redux/features/imageUploadSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from './authSlice';

interface ImageUploadState {
  imageUrl: string;
  publicId: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ImageUploadState = {
  imageUrl: '',
  publicId: '',
  status: 'idle',
  error: null,
};

export const uploadImage = createAsyncThunk(
  '/admin/products/upload-image',
  async (file: File) => {
    const formData = new FormData();
    formData.append('my_file', file);
    
    const response = await axios.post(
      `${API_URL}admin/products/upload-image`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    console.log(response, "Uploadimage slice");
    return response.data;
  }
);

export const deleteImage = createAsyncThunk(
  '/admin/products/delete-image',
  async (publicId: string) => {
    const response = await axios.delete(
      `${API_URL}admin/products/delete-image`,
      {
        data: { publicId },
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  }
);

const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {
    clearImageData: (state) => {
      state.imageUrl = '';
      state.publicId = '';
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action)
        state.imageUrl = action.payload.data.url; // Accéder à data.url
        state.publicId = action.payload.data.public_id; // Store public_id for cleanup
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action,"rejected")
        state.error = action.error.message || 'Upload failed';
      })
      .addCase(deleteImage.fulfilled, (state) => {
        state.imageUrl = '';
        state.publicId = '';
        state.status = 'idle';
      });
  },
});

export const { clearImageData } = imageUploadSlice.actions;
export default imageUploadSlice.reducer;