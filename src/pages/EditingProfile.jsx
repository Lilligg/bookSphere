import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/user/userSlice.ts";
import FieldEditingForm from "../components/FieldEditingForm.jsx";
import { EDITING_PROFILE_FIELD_GROUPS } from "../constants/EDITING_PROFILE_FIELD_GROUPS.js";
import AddAvatar from "../components/AddAvatar.jsx";

const INITIAL_FORM_USER = {
    name: "" ,
    city: "" ,
    dateOfBirth: "",
    gender: "",
    aboutYourself: "",
    favoriteGenres: [],
    unlovedGenres: [],
    favoriteAuthors: "",
    favoriteRereadBook: "",
    disappointingBook: "",
    readingFormat: [],
    favoriteBookSeries: "",
    readingLanguage: [],
    readingSpeed: [],
    readingTime: [],
    favoriteReadingPlaces: [],
    avatar: null,
}

const EditingProfile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const [formData, setFormData] = useState(INITIAL_FORM_USER);

    useEffect(() => {
        if(!user) return;

        setFormData({
            ...INITIAL_FORM_USER,
            ...user
            });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMultiSelectChange = (name) => (e) => {
        const { value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: Array.isArray(value) ? value : [value] // сохраняем массив значений
        }));
    };

    const handleSubmit = () => {
        dispatch(updateUser(formData));
        alert("Данные профиля сохранены")
    };

    return (
        <Box sx={{ width: "100%", mx: 'auto', p: 3, backgroundColor: '#F8F4E3'}}>
            <Typography variant="h4" align="center">
                Редактирование профиля
            </Typography>

        <Box display="flex" flexDirection="row" marginTop="30px">
            <Box sx={{ width: "70%"}}>
            {EDITING_PROFILE_FIELD_GROUPS.map((group, index) => (
                <FieldEditingForm
                    key={index}
                    group={group}
                    formData={formData}
                    handleChange={handleChange}
                    handleMultiSelectChange={handleMultiSelectChange}
                />
            ))}

            </Box>
            <AddAvatar
                title = "Аватар Пользователя"
                type = "typeUser"
            />
        </Box>


            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3 }}
                fullWidth
                onClick={handleSubmit}
            >
                Сохранить изменения
            </Button>
        </Box>
    );
};

export default EditingProfile;