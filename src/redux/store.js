import {combineReducers, configureStore} from '@reduxjs/toolkit';
import bookReducer from './book/bookSlice.js';
import userReducer from './user/userSlice.js';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    book: bookReducer,
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Важно для redux-persist
        }),
});

export const persistor = persistStore(store);