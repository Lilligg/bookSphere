import { combineReducers, configureStore } from '@reduxjs/toolkit';
import bookReducer from './book/bookSlice.js';
import userReducer from './user/userSlice.js';
import { persistStore, persistReducer } from 'redux-persist';
import localforage from 'localforage';

localforage.config({
    driver: [
        localforage.INDEXEDDB,
        localforage.WEBSQL,
        localforage.LOCALSTORAGE
    ],
    name: 'ReduxPersistStorage',
    storeName: 'redux_persist'
});

const persistConfig = {
    key: 'root',
    storage: localforage,
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
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);