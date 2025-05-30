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
                label: "О книге",
                name: "about",
                type: "text",
            }
        ]
    },
    {
        title: "Впечатления",
        fields: [
            {
                label: "Впечатления",
                name: "impressions",
                type: "text",
            }
        ]
    }
]