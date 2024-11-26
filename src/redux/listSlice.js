import { createSlice } from '@reduxjs/toolkit'
import listTemp from '../temp/listTemp.json'

const initialState = {
  contentList: listTemp
}

const listSlice = createSlice({
  name: 'contentList',
  initialState,
  reducers: {
    favoriteSort(state) {
      const newContentList = state.contentList.sort((a, b) => {
        if (a.favorite < b.favorite) return 1;
        if (a.favorite > b.favorite) return -1;
        return 0;
      });

      state.contentList = newContentList;
    },
    dateSort(state) {
      const newContentList = state.contentList.sort((a, b) => {
        if (new Date(a.date).getTime() > new Date(b.date).getTime()) return -1;
        if (new Date(a.date).getTime() < new Date(b.date).getTime()) return 1;
        return 0;
      });

      state.contentList = newContentList;
    }
  }
});

export const { favoriteSort, dateSort } = listSlice.actions

export default listSlice.reducer