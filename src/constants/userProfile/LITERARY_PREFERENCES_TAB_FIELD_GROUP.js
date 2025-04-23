export const LITERARY_PREFERENCES_TAB_FIELD_GROUP = (user = {}) => {
    return [
        {
            label: "Любимые жанры",
            value: user.favoriteGenres || "Не указан"
        },
        {
            label: "Нелюбимые жанры",
            value: user.unlovedGenres || "Не указан"
        },
        {
            label: "Любимые авторы",
            value: user.favoriteAuthors || "Не указан"
        },
        {
            label: "Самая перечитываемая книга",
            value: user.favoriteRereadBook || "Не указан"
        },
        {
            label: "Книга, которая разочаровала",
            value: user.disappointingBook || "Не указан"
        },
        {
            label: "Формат чтения",
            value: user.readingFormat || "Не указан"
        },
        {
            label: "Любимая книжная серия",
            value: user.favoriteBookSeries || "Не указан"
        },
        {
            label: "Языки чтения",
            value: user.readingLanguage || "Не указан"
        },
        {
            label: "Скорость чтения",
            value: user.readingSpeed || "Не указан"
        },
        {
            label: "Любимое время чтения",
            value: user.readingTime || "Не указан"
        },
        {
            label: "Любимое место для чтения",
            value: user.favoriteReadingPlaces || "Не указан"
        }
    ];
};