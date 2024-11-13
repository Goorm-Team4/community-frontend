import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import loadingSlice from './loadingSlice';
import modalReducer from './modalSlice';
import darkModeReducer from '../redux/darkModeSlice';

export const store = configureStore({
  reducer: {
    darkMode : darkModeReducer,
    user: userSlice,
    loading: loadingSlice,
    modal: modalReducer,
  },
});