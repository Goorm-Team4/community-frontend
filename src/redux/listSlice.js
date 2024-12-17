import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchContentList = createAsyncThunk('listSlice',
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/v1/posts`,
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
  contentList: []
}

const listSlice = createSlice({
  name: 'contentList',
  initialState,
  reducers: {
    favoriteSort(state) {
      const newContentList = state.contentList.sort((a, b) => {
        if (a.likeCount < b.likeCount) return 1;
        if (a.likeCount > b.likeCount) return -1;
        return 0;
      });

      state.contentList = newContentList;
    },
    dateSort(state) {
      const newContentList = state.contentList.sort((a, b) => {
        if (new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()) return -1;
        if (new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime()) return 1;
        return 0;
      });

      state.contentList = newContentList;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContentList.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchContentList.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        console.log("게시글 전체 목록 조회");
        console.log(action.payload.result);

        state.contentList = action.payload.result.posts;
      })
      .addDefaultCase((state, action) => { 
        console.error("게시글 목록 로딩 실패");
        
      })
  }
});

export const { favoriteSort, dateSort } = listSlice.actions

export default listSlice.reducer