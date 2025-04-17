import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './book/bookSlice.js';
import userReducer from './user/userSlice';


export const store = configureStore({
    reducer: {
        book: bookReducer,
        user: userReducer,
    },
});