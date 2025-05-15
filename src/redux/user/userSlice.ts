import { createSlice } from '@reduxjs/toolkit';

interface IUser {
    id: string;
    name: string;
    password: string;

    avatar: string;
    dateOfBirth: string;
    gender: string;
    city: string;
    aboutYourself: string;
    favoriteGenres: [];
    unlovedGenres: [];
    favoriteAuthors: string;
    favoriteRereadBook: string;
    disappointingBook: string;
    readingFormat: [];
    favoriteBookSeries: string;
    readingLanguage: [];
    readingSpeed: [];
    readingTime: [];
    favoriteReadingPlaces: [];
}

interface UserState {
    user: IUser;
    isAuth: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    isAuth: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload;
        },

        registration: (state, action) => {
            state.user = action.payload;
            state.isAuth = true;
        },

        logout: (state) => {
            state.user = null;
            state.isAuth = false;
        },
    },
});

export const { updateUser, logout, registration} = userSlice.actions;
export default userSlice.reducer;