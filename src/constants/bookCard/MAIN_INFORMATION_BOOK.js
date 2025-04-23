export const MAIN_INFORMATION_BOOK = (currentBook = {}) => {
    return ([
        {
            label: "Название",
            value: currentBook.title || "Не указано"
        },
        {
            label: "Автор",
            value: currentBook.author || "Не указан"
        },
        {
            label: "Год публикации",
            value: currentBook.yearPublication || "Не указан"
        },
    ])
}