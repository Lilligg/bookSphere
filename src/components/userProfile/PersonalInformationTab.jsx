import React from "react";
import {Box} from "@mui/material";
import InformPanel from "../InformPanel.jsx";
import {useSelector} from "react-redux";

const PersonalInformationTab = () => {
    const {user} = useSelector((state) => state.user);

    if (!user) {
        return <Box>Загрузка данных...</Box>;
    }

    const info = [
        { label: "Никнейм", value: user.name || "Не указан" },
        { label: "Город", value: user.city || "Не указан" },
        { label: "Дата рождения", value: user.dateOfBirth || "Не указан" },
        { label: "Пол", value: user.gender || "Не указан" },
        { label: "О себе", value: user.aboutYourself || "Не указан" },
    ];

    return (
        <Box>
            <InformPanel data={info} />
        </Box>
    );
}
export default PersonalInformationTab