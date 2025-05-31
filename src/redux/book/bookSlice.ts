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

interface ICollection {
    id: string;
    name: string;
    collection: IBook[];
}

interface BookState {
    books: IBook[];
    collectionBooks: ICollection[];
    isLoading: boolean;
    error: string | null;
    currentBook: IBook | null;
}

const initialState: BookState = {
    books: [],
    collectionBooks: [],
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

        setCurrentBookById: (state, action: PayloadAction<string>) => {
            state.currentBook = state.books.find(book => book.id === action.payload) || null;
        },

        updateBook: (state, action: PayloadAction<Partial<IBook> & { id: string }>) => {
            const index = state.books.findIndex(book => book.id === action.payload.id);

            if (index !== -1) {
                state.books[index] = {
                    ...state.books[index],
                    ...action.payload
                };

                if (state.currentBook?.id === action.payload.id) {
                    state.currentBook = {
                        ...state.currentBook,
                        ...action.payload
                    };
                }
            }
        },

        updateBookAvatar: (state, action: PayloadAction<{ id: string; avatar: string | null }>) => {
            const index = state.books.findIndex(book => book.id === action.payload.id);

            if (index !== -1) {
                state.books[index].avatar = action.payload.avatar;

                if (state.currentBook?.id === action.payload.id) {
                    state.currentBook.avatar = action.payload.avatar;
                }
            }
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
        },

        addCollection: (state, action: PayloadAction<ICollection>) => {
            state.collectionBooks.push(action.payload);
        },

        removeCollection: (state, action: PayloadAction<string>) => {
            state.collectionBooks = state.collectionBooks.filter(collection => collection.id !== action.payload);
        },

        updateCollectionBook: (state, action: PayloadAction<ICollection>) => {
            const index = state.collectionBooks.collection.findIndex(collection => collection.id === action.payload.id);
            if (index !== -1) {
                state.collectionBooks.collection[index] = action.payload.collection;
            }
        },
    }
});

export const { setBooks, addBook, updateBookAvatar, removeBook, updateBook, setCurrentBookById, addPersonage, updatePersonage, removePersonage, addCollection, removeCollection, updateCollectionBook} = bookSlice.actions;
export default bookSlice.reducer;