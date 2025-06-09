import { createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IPersonage {
    id: string;
    name: string;
    avatar?: string | null;
    gender: string;
    characterStatus?: "Главный герой" | "Антагонист" | "Второстепенный персонаж" | "Эпизодический персонаж";
    lifeStatus?: string;
    appearance?: string;
    character?: string;
    description?: string;
    effectOnStory: string;
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
    aboutAuthor: string;
    perfectReader: string;
    whoDoesNotLove: string;

    impressions?: string;
    surprises: string;
    tipsForTheReader: string;
    advantages: string;
    disadvantages: string;

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
    bookIds: string[];
}

interface BookState {
    books: IBook[];
    collectionBooks: ICollection[];
    isLoading: boolean;
    error: string | null;
    currentBook: IBook | null;
    currentPerson: IPersonage | null;
    sortConfig: {
        key: 'title' | 'author' | 'yearPublication' | 'overallRating';
        direction: 'asc' | 'desc';
    };
    listBooks: IBook[];
    listQuote: IQuotes[];
    listPerson: IPersonage[];
}

const initialState: BookState = {
    books: [],
    collectionBooks: [],
    isLoading: false,
    error: null,
    currentBook: null,
    currentPerson: null,
    sortConfig: {
        key: 'title',
        direction: 'asc',
    },
    listBooks: [],
    listQuote: [],
    listPerson: [],
};

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setBooks: (state, action: PayloadAction<IBook[]>) => {
            state.books = action.payload;
        },

        //
        //Операции с книгами
        //

        addBook: (state, action: PayloadAction<IBook>) => {
            state.books.push(action.payload);
        },

        removeBook: (state, action: PayloadAction<string>) => {
            const bookId = action.payload;

            state.books = state.books.filter(book => book.id !== bookId);

            state.collectionBooks.forEach(collection => {
                collection.bookIds = collection.bookIds.filter(id => id !== bookId);
            });
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

        //
        //Операции с персонажами
        //

        setCurrentPersonageById: (state, action: PayloadAction<{idPersonage: string, idBook:string}>) => {
            const book = state.books.find(book => book.id === action.payload.idBook);

            // Проверяем существование книги и массива персонажей
            if (book && Array.isArray(book.personages)) {
                // Находим персонажа по ID
                state.currentPersonage = book.personages.find(
                    personage => personage.id === action.payload.idPersonage
                ) || null;
            } else {
                state.currentPersonage = null;
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

        //
        //Операции с коллекциями
        //

        addCollection: (state, action: PayloadAction<ICollection>) => {
            if (!state.collectionBooks) {
                state.collectionBooks = [];
            }
            state.collectionBooks.push(action.payload);
        },

        removeCollection: (state, action: PayloadAction<string>) => {
            state.collectionBooks = state.collectionBooks.filter(collection => collection.id !== action.payload);
        },

        updateCollectionBook: (state, action: PayloadAction<{ id: string; name: string }>) => {
            const collection = state.collectionBooks.find(c => c.id === action.payload.id);
            if (collection) {
                collection.name = action.payload.name;
            }
        },

        addBookToCollectionById: (state, action: PayloadAction<{ collectionId: string; bookId: string }>) => {
            const { collectionId, bookId } = action.payload;
            const collection = state.collectionBooks.find(c => c.id === collectionId);

            if (collection && !collection.bookIds.includes(bookId)) {
                collection.bookIds.push(bookId);
            }
        },

        //
        //Вспомогательные операции
        //

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

        setListBooks(state, action: PayloadAction<{
            collectionName: string;
            resetSort?: boolean;
        }>) {
            const { collectionName, resetSort = false } = action.payload;

            // Фильтрация по коллекции
            if (collectionName === "allBooks") {
                state.listBooks = [...state.books];
            } else {
                const selectedCollection = state.collectionBooks.find(
                    collection => collection.name === collectionName
                );
                if (selectedCollection) {
                    state.listBooks = state.books.filter((book) =>
                        selectedCollection.bookIds.includes(book.id)
                    );
                }
            }

            // Сброс сортировки если нужно
            if (resetSort) {
                state.sortConfig = {
                    key: 'title',
                    direction: 'asc'
                };
            } else {
                // Применяем текущую сортировку
                const { key, direction } = state.sortConfig;
                state.listBooks.sort((a, b) => {
                    const aValue = a[key] ?? '';
                    const bValue = b[key] ?? '';

                    if (key === 'yearPublication' || key === 'overallRating') {
                        const aNum = Number(aValue) || 0;
                        const bNum = Number(bValue) || 0;
                        return direction === 'asc' ? aNum - bNum : bNum - aNum;
                    }

                    if (typeof aValue === 'string' && typeof bValue === 'string') {
                        return direction === 'asc'
                            ? aValue.localeCompare(bValue)
                            : bValue.localeCompare(aValue);
                    }

                    return 0;
                });
            }
        },

        setListQuotes(state, action: PayloadAction<{idBook: string, type: string, personageName: string}>) {
            const book = state.books.find(book => book.id === action.payload.idBook);

            switch (action.payload.type) {
                case "allQuotes":
                    state.listQuote = book.quotes;
                    break;

                case "personage":
                    const quoet = book.quotes.filter(quote => quote.person === action.payload.personageName);

                    state.listQuote = quoet
                    break;
            }
        },

        setListPerson(state, action: PayloadAction<{idBook: string, type: string, variant: string}>) {
            const book = state.books.find(book => book.id === action.payload.idBook);

            switch (action.payload.type) {
                case "allPerson":
                    state.listPerson = book.personages;
                    break;

                case "gender":
                    const personGender = book.personages.filter(person => person.gender === action.payload.variant);
                    state.listPerson = personGender
                    break;

                case "characterStatus":
                    const personCharacterStatus = book.personages.filter(person => person.characterStatus === action.payload.variant);
                    state.listPerson = personCharacterStatus
                    break;
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
    addBookToCollectionById,
    setCurrentPersonageById,
    setListQuotes,
    setListPerson
} = bookSlice.actions;

export default bookSlice.reducer;