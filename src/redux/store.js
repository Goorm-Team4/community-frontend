import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import loadingSlice from './loadingSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    loading: loadingSlice,
    modal: modalReducer,
  },
});
