import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from '../redux/darkModeSlice';
import listSlice from '../redux/listSlice';

export const store = configureStore({
  reducer: {
    darkMode : darkModeReducer,
    contentList : listSlice
  },
});
