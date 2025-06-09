import {
    GENDER_OPTIONS,
    GENRE_OPTIONS,
    LANGUAGE_OPTIONS,
    READING_FORMAT_OPTIONS,
    READING_PLACES_OPTIONS,
    READING_SPEED_OPTIONS,
    READING_TIME_OPTIONS
} from "./FIELD_OPTIONS.js";

export const EDITING_PROFILE_FIELD_GROUPS = [
    {
        title: "Основная информация",
        fields: [
            {
                label: "Имя",
                name: "name",
                type: "text",
                required: true
            },
            {
                label: "Город",
                name: "city",
                type: "text"
            },
            {
                label: "Дата рождения",
                name: "dateOfBirth",
                type: "date",
                inputProps: {
                    max: new Date().toISOString().split('T')[0]
                }
            },
            {
                label: "Пол",
                name: "gender",
                type: "select",
                options: GENDER_OPTIONS
            },
            {
                label: "О себе",
                name: "aboutYourself",
                type: "multiline",
                rows: 4,
                placeholder: "Расскажите о своих интересах, любимых книгах..."
            }
        ]
    },
    {
        title: "Любимая цитата",
        fields: [
            {
                label: "Цитата",
                name: "loveQuote",
                type: "multiline",
                rows: 4,
                placeholder: "Напишите текст вашей любимой цитаты, она будет отображаться в профиле"
            },
            {
                label: "Автор цитаты",
                name: "authorLoveQuote",
                type: "text"
            },
        ]
    },
    {
        title: "Литературные предпочтения",
        fields: [
            {
                label: "Любимые жанры",
                name: "favoriteGenres",
                type: "multiselect",
                options: GENRE_OPTIONS
            },
            {
                label: "Нелюбимые жанры",
                name: "unlovedGenres",
                type: "multiselect",
                options: GENRE_OPTIONS
            },
            {
                label: "Любимые авторы",
                name: "favoriteAuthors",
                type: "multiline",
                rows: 2,
                placeholder: "Перечислите через запятую"
            },
            {
                label: "Самая перечитываемая книга",
                name: "favoriteRereadBook",
                type: "multiline",
                rows: 2,
            },
            {
                label: "Книга, которая разочаровала",
                name: "disappointingBook",
                type: "multiline",
                rows: 2,
            },
            {
                label: "Формат чтения",
                name: "readingFormat",
                type: "multiselect",
                options: READING_FORMAT_OPTIONS
            },
            {
                label: "Любимая книжная серия",
                name: "favoriteBookSeries",
                type: "multiline",
                rows: 2,
            },
            {
                label: "Языки чтения",
                name: "readingLanguage",
                type: "multiselect",
                options: LANGUAGE_OPTIONS
            },
            {
                label: "Скорость чтения",
                name: "readingSpeed",
                type: "select",
                options: READING_SPEED_OPTIONS
            },
            {
                label: "Любимое время чтения",
                name: "readingTime",
                type: "multiselect",
                options: READING_TIME_OPTIONS
            },
            {
                label: "Любимое место для чтения",
                name: "favoriteReadingPlaces",
                type: "multiselect",
                options: READING_PLACES_OPTIONS
            },
        ]

    }
];