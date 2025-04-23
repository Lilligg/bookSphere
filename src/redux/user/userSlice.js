import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = {
                name: action.payload.name,
                avatar: action.payload.avatar,
                dateOfBirth: action.payload.dateOfBirth,
                gender: action.payload.gender,
                city: action.payload.city,
                aboutYourself: action.payload.aboutYourself,
                favoriteGenres: action.payload.favoriteGenres,
                unlovedGenres: action.payload.unlovedGenres,
                favoriteAuthors: action.payload.favoriteAuthors,
                favoriteRereadBook: action.payload.favoriteRereadBook,
                disappointingBook: action.payload.disappointingBook,
                readingFormat: action.payload.readingFormat,
                favoriteBookSeries: action.payload.favoriteBookSeries,
                readingLanguage: action.payload.readingLanguage,
                readingSpeed: action.payload.readingSpeed,
                readingTime: action.payload.readingTime,
                favoriteReadingPlaces: action.payload.favoriteReadingPlaces
            }
            state.isAuth = !!action.payload;
        },

        logout: (state) => {
            state.user = null;
            state.isAuth = false;
        },

        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setUser, logout, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;