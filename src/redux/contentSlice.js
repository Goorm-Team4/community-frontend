import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchContentRead = createAsyncThunk('contentSlice',
  async (id) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL_PROXY}/api/v1/posts`,
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
  id: "",
  content: []
}

const contentSlice = createSlice({
  name: 'contentSlice',
  initialState,
  reducers: {
    getId(state, action) {
      state.id = action.payload.id;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContentRead.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchContentRead.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        console.log("게시글 조회");
        console.log(action.payload.result);

        state.content = action.payload.result;
      })
      .addDefaultCase((state, action) => { })
  }
});

export const { getId } = contentSlice.actions

export default contentSlice.reducer