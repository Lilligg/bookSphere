import {GENRE_OPTIONS} from "./FIELD_OPTIONS.js";

export const EDITING_BOOK_FIELD_GROUP = [
    {
        title: "Основная информация",
        fields: [
            {
                label: "Название",
                name: "title",
                type: "text",
                required: true
            },
            {
                label: "Автор",
                name: "author",
                type: "text",
                required: true
            },
            {
                label: "Жанр",
                name: "genre",
                type: "multiselect",
                options: GENRE_OPTIONS
            },
            {
                label: "Год публикации",
                name: "yearPublication",
                type: "text",
                required: true
            },
        ]
    },
    {
        title: "О книге",
        fields: [
            {
                label: "Сюжет",
                name: "about",
                rows: 5,
                type: "multiline",
            },
            {
                label: "Об авторе",
                name: "aboutAuthor",
                rows: 5,
                type: "multiline",
            },
        ]
    },
    {
        title: "Для кого эта книга",
        fields: [
            {
                label: "Идеальный читатель",
                name: "perfectReader",
                rows: 4,
                type: "multiline",
            },
            {
                label: "Кому не подойдет",
                name: "whoDoesNotLove",
                rows: 4,
                type: "multiline",
            },
        ]
    },
    {
        title: "Впечатления",
        fields: [
            {
                label: "Эмоции",
                name: "impressions",
                rows: 4,
                type: "multiline",
            },
            {
                label: "Неожиданности",
                name: "surprises",
                rows: 4,
                type: "multiline",
            },
            {
                label: "Советы читателю",
                name: "tipsForTheReader",
                rows: 4,
                type: "multiline",
            },
        ]
    },
    {
        title: "Плюсы и минусы",
        fields: [
            {
                label: "Достоинства произведения",
                name: "advantages",
                rows: 4,
                type: "multiline",
            },
            {
                label: "Недостатки произведения",
                name: "disadvantages",
                rows: 4,
                type: "multiline",
            },
        ]
    }
]