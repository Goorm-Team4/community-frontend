import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import loadingSlice from './loadingSlice';
import modalReducer from './modalSlice';
import darkModeReducer from '../redux/darkModeSlice';
import listSlice from '../redux/listSlice';
import contentSlice from '../redux/contentSlice'
import writeSlice from './writeSlice'

export const store = configureStore({
  reducer: {
    darkMode : darkModeReducer,
    contentList : listSlice,
    user: userSlice,
    loading: loadingSlice,
    modal: modalReducer,
    content: contentSlice,
    write: writeSlice
  },
});