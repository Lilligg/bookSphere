import { createSlice } from '@reduxjs/toolkit';

interface IUser {
    id: string;
    name: string;
    password: string;

    avatar: string | null;
    dateOfBirth: string;
    gender: string;
    city: string;
    aboutYourself: string;

    loveQuote: string;
    authorLoveQuote: string;

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
            if (state.user) {
                state.user = {
                    ...state.user,
                    ...action.payload
                };
            } else {
                state.user = action.payload;
            }
        },

        updateUserAvatar: (state, action) => {
            if (state.user) {
                state.user.avatar = action.payload;
            }
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

export const { updateUser, updateUserAvatar, logout, registration} = userSlice.actions;
export default userSlice.reducer;
