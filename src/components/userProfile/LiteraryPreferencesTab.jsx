import {Box} from "@mui/material";
import InformPanel from "../InformPanel.jsx";
import React from "react";
import {useSelector} from "react-redux";

const LiteraryPreferencesTab = () => {
    const {user} = useSelector((state) => state.user);

    if (!user) {
        return <Box>Загрузка данных...</Box>;
    }

    const info = [
        { label: "Любимые жанры", value: user.favoriteGenres || "Не указан" },
        { label: "Нелюбимые жанры", value: user.unlovedGenres || "Не указан" },
        { label: "Любимые авторы", value: user.favoriteAuthors || "Не указан" },
        { label: "Самая перечитываемая книга", value: user.favoriteRereadBook || "Не указан" },
        { label: "Книга, которая разочаровала", value: user.disappointingBook || "Не указан" },
        { label: "Формат чтения", value: user.readingFormat || "Не указан" },
        { label: "Любимая книжная серия", value: user.favoriteBookSeries || "Не указан" },
        { label: "Языки чтения", value: user.readingLanguage || "Не указан" },
        { label: "Скорость чтения", value: user.readingSpeed || "Не указан" },
        { label: "Любимое время чтения", value: user.readingTime || "Не указан" },
        { label: "Любимое место для чтения", value: user.favoriteReadingPlaces || "Не указан" }
    ];

    return (
        <Box>
            <InformPanel data={info} />
        </Box>
    )
}

export default LiteraryPreferencesTab;