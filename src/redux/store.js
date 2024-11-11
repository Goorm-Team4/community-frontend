import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from '../redux/darkModeSlice';

export const store = configureStore({
  reducer: {
    darkMode : darkModeReducer
  },
});
