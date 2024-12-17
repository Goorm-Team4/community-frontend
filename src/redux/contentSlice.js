import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import contenttemp from '../temp/contentTemp.json'

export const fetchContentRead = createAsyncThunk('contentSlice',
  async ( postId ) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/posts/${postId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;

    } catch (error) {
      console.log("api 오류");
    }
  }
);

const initialState = {
  id: 1,
  contentData: []
}

const contentSlice = createSlice({
  name: 'contentSlice',
  initialState,
  reducers: {
    getId(state, action) {
      state.postId = action.payload;
      console.log(`id: ${state.postId}`);

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
      .addDefaultCase((state, action) => {
        console.error("게시글 조회 실패");

      })
  }
});

export const { } = contentSlice.actions

export default contentSlice.reducer