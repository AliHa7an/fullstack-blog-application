import { configureStore } from '@reduxjs/toolkit';
import blogSlice from './blogSlice';

export const store = configureStore({
  reducer: {
    blogs: blogSlice,
  },
});
