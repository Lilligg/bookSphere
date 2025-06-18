import { createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IPersonage {
    id: string;
    name: string;
    avatar: string | null;
    gender?: string;
    age: number;
    characterStatus: "Главный герой" | "Антагонист" | "Второстепенный персонаж" | "Эпизодический персонаж";
    lifeStatus?: "Жив" | "Мертв";
    appearance?: string;
    character?: string;
    description?: string;
    effectOnStory?: string;
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
    lastUpdated: number;
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
    lastUpdated: 0,
};

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
    //Операции с книгами
        addBook: (state, action: PayloadAction<IBook>) => {
            state.books.push(action.payload);
            state.lastUpdated = Date.now();
        },

        removeBook: (state, action: PayloadAction<string>) => {
            const bookId = action.payload;

            state.books = state.books.filter(book => book.id !== bookId);

            state.collectionBooks = state.collectionBooks.map(collection => ({
                ...collection,
                bookIds: collection.bookIds.filter(id => id !== bookId)
            }));

            if (state.currentBook?.id === bookId) {
                state.currentBook = null;
            }

            state.listBooks = state.listBooks?.filter(book => book.id !== bookId) || [];

            state.lastUpdated = Date.now();
        },

        updateBook: (state, action: PayloadAction<Partial<IBook>>) => {
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
            state.lastUpdated = Date.now();
        },

        setCurrentBookById: (state, action: PayloadAction<string>) => {
            state.currentBook = state.books.find(book => book.id === action.payload) || null;
        },

        updateBookAvatar: (state, action: PayloadAction<{ id: string; avatar: string | null }>) => {
            const index = state.books.findIndex(book => book.id === action.payload.id);

            if (index !== -1) {
                state.books[index].avatar = action.payload.avatar;

                if (state.currentBook?.id === action.payload.id) {
                    state.currentBook.avatar = action.payload.avatar;
                }
            }
            state.lastUpdated = Date.now();
        },

    //Операции с персонажами

        updatePersonage: (state, action: PayloadAction<{
            bookID: string;
            personageId: string;
            newPersonage: IPersonage
        }>) => {
            const { bookID, personageId, newPersonage } = action.payload;

            const bookIndex = state.books.findIndex(b => b.id === bookID);
            if (bookIndex !== -1) {
                const personageIndex = state.books[bookIndex].personages?.findIndex(
                    p => p.id === personageId
                ) ?? -1;

                if (personageIndex !== -1) {
                    const currentAvatar = state.books[bookIndex].personages[personageIndex].avatar;
                    const avatarToKeep = newPersonage.avatar === null ? currentAvatar : newPersonage.avatar;

                    state.books[bookIndex].personages[personageIndex] = {
                        ...newPersonage,
                        avatar: avatarToKeep,
                        id: personageId
                    };
                }
            }

            if (state.currentBook?.id === bookID) {
                const personageIndex = state.currentBook.personages?.findIndex(
                    p => p.id === personageId
                ) ?? -1;

                if (personageIndex !== -1) {
                    const currentAvatar = state.currentBook.personages[personageIndex].avatar;
                    const avatarToKeep = newPersonage.avatar === null ? currentAvatar : newPersonage.avatar;

                    state.currentBook.personages[personageIndex] = {
                        ...newPersonage,
                        avatar: avatarToKeep,
                        id: personageId
                    };
                }
            }

            if (state.currentPersonage?.id === personageId) {
                const currentAvatar = state.currentPersonage.avatar;
                state.currentPersonage = {
                    ...newPersonage,
                    avatar: newPersonage.avatar === null ? currentAvatar : newPersonage.avatar,
                    id: personageId
                };
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

        setCurrentPersonageById: (state, action: PayloadAction<{idPersonage: string, idBook:string}>) => {
            const book = state.books.find(book => book.id === action.payload.idBook);

            if (book && Array.isArray(book.personages)) {
                state.currentPersonage = book.personages.find(
                    personage => personage.id === action.payload.idPersonage
                ) || null;
            } else {
                state.currentPersonage = null;
            }
        },

    //Операции с коллекциями

        addCollection: (state, action: PayloadAction<ICollection>) => {
            if (!state.collectionBooks) {
                state.collectionBooks = [];
            }
            state.collectionBooks.push(action.payload);
        },

        removeCollection: (state, action: PayloadAction<string>) => {
            state.collectionBooks = state.collectionBooks.filter(collection => collection.id !== action.payload);
        },

        updateCollection: (state, action: PayloadAction<{ id: string; name: string }>) => {
            const collection = state.collectionBooks.find(collection => collection.id === action.payload.id);

            if (collection) {
                collection.name = action.payload.name;
            }
        },

        addBookToCollectionById: (state, action: PayloadAction<{ collectionId: string; bookId: string }>) => {
            const collection = state.collectionBooks.find(collection => collection.id === action.payload.collectionId);

            if (collection && !collection.bookIds.includes(action.payload.bookId)) {
                collection.bookIds.push(action.payload.bookId);
            }
        },

    //Вспомогательные операции

        setSortConfig: (state, action: PayloadAction<{
            key: 'title' | 'author' | 'yearPublication' | 'overallRating';
            direction?: 'asc' | 'desc';
        }>) => {
            const { key, direction } = action.payload;

            let newDirection: 'asc' | 'desc' = direction ||
                (state.sortConfig.key === key
                    ? (state.sortConfig.direction === 'asc' ? 'desc' : 'asc')
                    : 'asc');

            // Фильтр пустых книг
            const validBooks = (state.listBooks.length > 0 ? state.listBooks : state.books).filter(book =>
                book && book.id && book[key] !== undefined
            );

            const sortedBooks = [...validBooks].sort((a, b) => {
                const aValue = a[key] ?? '';
                const bValue = b[key] ?? '';

                // Для чисел
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
            state.sortConfig = { key, direction: newDirection };
            state.listBooks = sortedBooks;
        },

        searchBook: (state, action: PayloadAction<string>) => {
        state.listBooks = state.books.filter(book =>
            book.title.toLowerCase().includes(action.payload.toLowerCase()))
        },

        setListBooks(state, action: PayloadAction<{
            collectionName: string;
            resetSort?: boolean;
        }>) {

            const { collectionName, resetSort = false } = action.payload;

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

            if (resetSort) {
                state.sortConfig = {
                    key: 'title',
                    direction: 'asc'
                };
            } else {
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
                    const quote = book.quotes.filter(quote => quote.person === action.payload.personageName);

                    state.listQuote = quote
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
    addBook,
    updateBookAvatar,
    removeBook,
    updateBook,
    setCurrentBookById,
    updatePersonage,
    removePersonage,
    addCollection,
    removeCollection,
    updateCollection,
    setSortConfig,
    setListBooks,
    addBookToCollectionById,
    setCurrentPersonageById,
    setListQuotes,
    setListPerson,
    searchBook
} = bookSlice.actions;

export default bookSlice.reducer;