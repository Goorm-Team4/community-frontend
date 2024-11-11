import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkModeActive : true,
}

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggle : (state) => {
      state.darkModeActive = !state.darkModeActive
    }
  }
});

export const { toggle } = darkModeSlice.actions

export default darkModeSlice.reducer