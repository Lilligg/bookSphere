import { createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IPersonage {
    id: string;
    name: string;
    avatar?: string | null;
    characterStatus?: string;
    appearance?: string;
    character?: string;
    description?: string;
}

interface IQuotes {
    id: string;
    person?: string | null;
    text: string;
}

interface IStatistics {
    status?: "В процессе" | "Завершен" | "Заморожено" | "В планах";
    startDateOfReading?: string;
    endDateOfReading?: string;
    totalNumberOfPages?: number;
    numberOfPagesRead?: number;
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

    quotes?: IQuotes[] | null;

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
    statistics?: IStatistics;
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
    sortConfig: {
        key: 'title' | 'author' | 'yearPublication' | 'overallRating';
        direction: 'asc' | 'desc';
    };
    listBooks: IBook[];
}

const initialState: BookState = {
    books: [],
    collectionBooks: [],
    isLoading: false,
    error: null,
    currentBook: null,
    sortConfig: {
        key: 'title',
        direction: 'asc',
    },
    listBooks: [],
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
            if (!state.collectionBooks) {
                state.collectionBooks = [];
            }
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

        setSortConfig: (state, action: PayloadAction<{
            key: 'title' | 'author' | 'yearPublication' | 'overallRating';
            direction?: 'asc' | 'desc';
        }>) => {
            const { key, direction } = action.payload;

            // Определяем новое направление
            let newDirection: 'asc' | 'desc' = direction ||
                (state.sortConfig.key === key
                    ? (state.sortConfig.direction === 'asc' ? 'desc' : 'asc')
                    : 'asc');

            // Фильтруем пустые или невалидные книги перед сортировкой
            const validBooks = (state.listBooks.length > 0 ? state.listBooks : state.books).filter(book =>
                book && book.id && book[key] !== undefined
            );

            // Сортируем только валидные книги
            const sortedBooks = [...validBooks].sort((a, b) => {
                const aValue = a[key] ?? '';
                const bValue = b[key] ?? '';

                // Для числовых значений
                if (key === 'yearPublication' || key === 'overallRating') {
                    const aNum = Number(aValue) || 0;
                    const bNum = Number(bValue) || 0;
                    return newDirection === 'asc' ? aNum - bNum : bNum - aNum;
                }

                // Для строк
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return newDirection === 'asc'
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }

                return 0;
            });

            // Сохраняем изменения
            state.sortConfig = { key, direction: newDirection };
            state.listBooks = sortedBooks;
        },

        setListBooks(state, action: PayloadAction<string>) {
            if (action.payload === "allBooks") {
                state.listBooks = state.books;

            } else {
                const foundCollection = state.collectionBooks.find(
                    collection => collection.name === action.payload
                );
                if (foundCollection) {
                    state.listBooks = foundCollection.collection;
                }
            }
        },

        addBookToCollectionById: (state, action: PayloadAction<{collectionId, bookId}>) => {
            const { collectionId, bookId } = action.payload;

            // 1. Находим коллекцию
            const collection = state.collectionBooks.find(coll => coll.id === collectionId);
            if (!collection) return;

            // 2. Находим книгу в общем списке
            const bookToAdd = state.books.find(book => book.id === bookId);
            if (!bookToAdd) return;

            // 3. Проверяем, нет ли уже такой книги в коллекции
            const bookExists = collection.collection.some(b => b.id === bookId);
            if (bookExists) return;

            // 4. Добавляем книгу
            collection.collection.push(bookToAdd);

            // 5. Обновляем текущий список, если он отображается
            if (state.currentCollection?.id === collectionId) {
                state.currentCollection = collection;
            }
        },
    },
});

export const {
    setBooks,
    addBook,
    updateBookAvatar,
    removeBook,
    updateBook,
    setCurrentBookById,
    addPersonage,
    updatePersonage,
    removePersonage,
    addCollection,
    removeCollection,
    updateCollectionBook,
    setSortConfig,
    setListBooks,
    addBookToCollectionById
} = bookSlice.actions;

export default bookSlice.reducer;