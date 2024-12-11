import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  content: {
    title: "",
    contentArea: "",
    date: "",
  }
}

const writeSlice = createSlice({
  name: 'writeSilce',
  initialState,
  reducers: {
    writetitle: (state, action) => {
      state.title = action.payload;
    },
    writeContentArea: (state, action) => {
      state.contentArea = action.payload;
    },
  }
});

export const { writetitle, writeContentArea } = writeSlice.actions

export default writeSlice.reducer