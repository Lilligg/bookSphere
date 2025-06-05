import { combineReducers, configureStore } from '@reduxjs/toolkit';
import bookReducer from './book/bookSlice.js';
import userReducer from './user/userSlice.js';
import { persistStore, persistReducer } from 'redux-persist';
import localforage from 'localforage'; // Заменяем стандартное хранилище на localForage

// Настройка localForage (опционально)
localforage.config({
    driver: [
        localforage.INDEXEDDB, // Предпочтительный драйвер
        localforage.WEBSQL,    // Fallback
        localforage.LOCALSTORAGE // Резервный вариант
    ],
    name: 'ReduxPersistStorage', // Имя базы данных
    storeName: 'redux_persist'   // Название хранилища
});

const persistConfig = {
    key: 'root',
    storage: localforage, // Используем localForage вместо redux-persist/lib/storage
    // Дополнительные опции (по желанию):
    // whitelist: ['user'], // Сохранять только определённые редьюсеры
    // blacklist: ['book'], // Игнорировать определённые редьюсеры
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