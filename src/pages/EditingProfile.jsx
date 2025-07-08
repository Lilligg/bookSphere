import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/user/userSlice.ts";
import FieldEditingForm from "../components/FieldEditingForm.jsx";
import { EDITING_PROFILE_FIELD_GROUPS } from "../constants/editingProfile/EDITING_PROFILE_FIELD_GROUPS.js";
import AddAvatar from "../components/AddAvatar.jsx";

const INITIAL_FORM_USER = {
    name: "" ,
    city: "" ,
    dateOfBirth: "",
    gender: "",
    aboutYourself: "",
    loveQuote: "",
    authorLoveQuote: "",
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
            [name]: Array.isArray(value) ? value : [value]
        }));
    };

    const handleSubmit = () => {
        dispatch(updateUser(formData));
        alert("Данные профиля сохранены")
    };

    return (
        <Box  backgroundColor = '#E6CCB2'
              padding={{xs: 2, sm: 3}}
              sx={{
                  borderRadius: { xs: 2, sm: 3 },
                  margin: { xs: 1, sm: 2 }
              }}
        >
            <Typography
                variant="h4"
                align="center"
                sx={{
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                    mb: { xs: 2, sm: 3 }
                }}
            >
                Редактирование профиля
            </Typography>

            <Box display="flex"
                 flexDirection={{xs: "column", md: "row"}}

            >
                <Box
                    sx={{
                        width: { xs: "100%", md: "70%" },
                        pr: { md: 2 }
                    }}
                >
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
                <Box display="flex" justifyContent="center">
                    <AddAvatar
                        title = "Аватар Пользователя"
                        type = "typeUser"
                    />
                </Box>
            </Box>

            <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                sx={{
                    backgroundColor: '#7F5539',
                    color: '#FFFFFF',
                }}
            >
                Сохранить изменения
            </Button>
        </Box>
    );
};

export default EditingProfile;