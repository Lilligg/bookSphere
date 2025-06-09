import {GENRE_OPTIONS} from "./FIELD_OPTIONS.js";

export const EDITING_STATISTIC_BOOK = [
    {
        title: "Статистика книги",
        fields: [
            {
                label: "Статус чтения",
                name: "status",
                type: "select",
                options: [
                    { value: "В процессе", label: "В процессе" },
                    { value: "Завершен", label: "Завершен" },
                    { value: "Заморожено", label: "Заморожено" },
                    { value: "В планах", label: "В планах" },
                ],
            },
            {
                label: "Дата начала чтения",
                name: "startDateOfReading",
                type: "date",
                inputProps: {
                    max: new Date().toISOString().split('T')[0]
                }
            },
            {
                label: "Дата окончания чтения",
                name: "endDateOfReading",
                type: "date",
                inputProps: {
                    max: new Date().toISOString().split('T')[0]
                }
            },
            {
                label: "Количество страниц в книге",
                name: "totalNumberOfPages",
                type: "text",
            },
            {
                label: "Количество прочитанных страниц",
                name: "numberOfPagesRead",
                type: "text",
            },
        ]
    },
]