export const PERSONAL_INFORMATION_TAB_FIELD_GROUP = (user = {}) => {
    return [
        {
            label: "Никнейм",
            value: user.name || "Не указан"
        },
        {
            label: "Город",
            value: user.city || "Не указан"
        },
        {
            label: "Дата рождения",
            value: user.dateOfBirth || "Не указан"
        },
        {
            label: "Пол",
            value: user.gender || "Не указан"
        },
        {
            label: "О себе",
            value: user.aboutYourself || "Не указан"
        },
    ];
};