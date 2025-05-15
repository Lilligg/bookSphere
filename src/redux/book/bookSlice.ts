import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IPersonage {
    id: string;
    name: string;
    avatar?: string | null;
    characterStatus?: string;
    appearance?: string;
    character?: string;
    description?: string;
}

interface IBook {
    id: string;
    title: string;
    author: string;
    avatar?: string | null;
    genre?: string;
    yearPublication: string | null;

    about?: string;
    impressions?: string;

    personages: IPersonage[],

    quotes?: {
       id: string;
       person?: string | null;
       text: string;
    }[] | null;

    overallRating?: number;
    rating?: {
        styleMastery: number;
        characterDepth: number;
        plotConsistency: number;
        worldBuildingScore: number;
        thematicWeight: number;
        emotionalImpact: number;
        readingDifficulty: number;
        rereadValue: number;
    };
}

interface BookState {
    books: IBook[];
    isLoading: boolean;
    error: string | null;
    currentBook: IBook | null;
}

const initialState: BookState = {
    books: [],
    isLoading: false,
    error: null,
    currentBook: null,
};

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setBooks: (state, action: PayloadAction<IBook[]>) => {
            state.books = action.payload;
        },
        addBook: (state, action: PayloadAction<IBook>) => {
            state.books.push(action.payload);
        },
        removeBook: (state, action: PayloadAction<string>) => {
            state.books = state.books.filter(book => book.id !== action.payload);
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },

        updateBook: (state, action: PayloadAction<IBook>) => {
            const index = state.books.findIndex(book => book.id === action.payload.id);

            if (index !== -1) {
                // Обновляем книгу в массиве books
                state.books[index] = action.payload;

                // Если это текущая книга, обновляем и currentBook
                if (state.currentBook?.id === action.payload.id) {
                    state.currentBook = action.payload;
                }
            }
        },

        setCurrentBookById: (state, action: PayloadAction<string>) => {
            state.currentBook = state.books.find(book => book.id === action.payload) || null;
        },


        addPersonage: (state, action: PayloadAction<{ bookId: string; personage: IPersonage }>) => {
            const book = state.books.find(b => b.id === action.payload.bookId);

            if (book) {
                book.personages.push(action.payload.personage);

                if (state.currentBook?.id === action.payload.bookId) {
                    state.currentBook.personages.push(action.payload.personage);
                }
            }
        },

        updatePersonage: (state, action: PayloadAction<{ bookId: string; personage: IPersonage }>) => {
            const book = state.books.find(b => b.id === action.payload.bookId);

            if (book) {
                const index = book.personages.findIndex(p => p.id === action.payload.personage.id);

                if (index !== -1) {
                    book.personages[index] = action.payload.personage;

                    if (state.currentBook?.id === action.payload.bookId) {
                        state.currentBook.personages[index] = action.payload.personage;
                    }
                }
            }
        },

        removePersonage: (state, action: PayloadAction<{ bookId: string; personageId: string }>) => {
            const book = state.books.find(b => b.id === action.payload.bookId);

            if (book) {
                book.personages = book.personages.filter(p => p.id !== action.payload.personageId);

                if (state.currentBook?.id === action.payload.bookId) {
                    state.currentBook.personages = state.currentBook.personages.filter(p => p.id !== action.payload.personageId);
                }
            }
        }
    },
});

export const { setBooks, addBook, removeBook, setLoading, setError, updateBook, setCurrentBookById, addPersonage, updatePersonage, removePersonage} = bookSlice.actions;
export default bookSlice.reducer;