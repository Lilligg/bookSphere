import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IPersonage {
    id: string;
    name: string;
    avatar?: string | null;
    characterStatus: string;
    appearance: string;
    character: string;
    description: string;
}

interface IBook {
    id: string | null;
    title: string | null;
    author: string | null;
    avatar?: string | null;
    genre?: string | null;
    yearPublication: string | null;

    personages: IPersonage[],

    quotes?: {
       person: string | null;
       text: string | null;
    }[] | null;

    rating: {
        overall: number | null;
        styleMastery: number | null;
        characterDepth: number | null;
        plotConsistency: number | null;
        worldBuildingScore: number | null;
        thematicWeight: number | null;
        emotionalImpact: number | null;
        readingDifficulty: number | null;
        rereadValue: number | null;
    } | null;

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

        setCurrentBookById: (state, action: PayloadAction<string>) => {
            const bookId = action.payload;
            state.currentBook = state.books.find(book => book.id === bookId) || null;
        },

        addPersonage: (state, action: PayloadAction<{ bookId: string; personage: IPersonage }>) => {
            const book = state.books.find(b => b.id === action.payload.bookId);
            if (book) {
                book.personages.push(action.payload.personage);
                if (state.currentBook?.id === action.payload.bookId) {
                    state.currentBook.personages = [...book.personages];
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
                        state.currentBook.personages = [...book.personages];
                    }
                }
            }
        },
        removePersonage: (state, action: PayloadAction<{ bookId: string; personageId: string }>) => {
            const book = state.books.find(b => b.id === action.payload.bookId);
            if (book) {
                book.personages = book.personages.filter(p => p.id !== action.payload.personageId);
                if (state.currentBook?.id === action.payload.bookId) {
                    state.currentBook.personages = [...book.personages];
                }
            }
        }
    },
});

export const { setBooks, addBook, removeBook, setLoading, setError, setCurrentBookById, addPersonage, updatePersonage, removePersonage} = bookSlice.actions;
export default bookSlice.reducer;