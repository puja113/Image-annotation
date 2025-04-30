import { configureStore } from '@reduxjs/toolkit';
import commentsReducer , { persistStateMiddleware } from './commentsSlice';

const store = configureStore({
  reducer: {
    comments: commentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistStateMiddleware),
});


export default store;
