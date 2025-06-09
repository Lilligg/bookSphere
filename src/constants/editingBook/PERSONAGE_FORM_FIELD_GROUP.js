import {GENDER_OPTIONS, STATUS_PERSONAGES} from "../FIELD_OPTIONS.js";

export const PERSONAGE_FORM_FIELD_GROUP = [
    {
        title: "Основная информация",
        fields: [
            {
                label: "Имя персонажа",
                name: "name",
                type: "text",
                required: true
            },
            {
                label: "Статус персонажа",
                name: "characterStatus",
                type: "select",
                options: STATUS_PERSONAGES
            },
            {
                label: "Пол персонажа",
                name: "gender",
                type: "select",
                options: GENDER_OPTIONS
            },
            {
                label: "Внешность",
                name: "appearance",
                rows: 4,
                type: "multiline",
            },
            {
                label: "Характер",
                name: "character",
                rows: 4,
                type: "multiline",
            },
            {
                label: "Описание",
                name: "description",
                rows: 4,
                type: "multiline",
            },
            {
                label: "Влияние на историю",
                name: "effectOnStory",
                rows: 4,
                type: "multiline",
            },
        ]
    }
]