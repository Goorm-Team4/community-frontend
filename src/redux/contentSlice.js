import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import contentTemp from '../temp/contentTemp.json'
import axios from 'axios';

export const contentRead = createAsyncThunk('contentSlice/fetchContentById',
  async (id) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL_PROXY}/post`,
      {
        id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

const initialState = {
  content: contentTemp
}

const contentSlice = createSlice({
  name: 'contentSlice',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(contentRead.fulfilled, (state, action) => {
          state.content = action.payload;
      })
      .addDefaultCase((state, action) => { })
  }
});

export const { } = contentSlice.actions

export default contentSlice.reducer