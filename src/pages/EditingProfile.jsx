import {Avatar, Box, Button, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../redux/user/userSlice.js";
import FieldEditingForm from "../components/FieldEditingForm.jsx";
import {genreOptions, genderOptions, readingFormatOptions, readingTimeOptions, readingSpeedOptions, readingPlacesOptions, languageOptions} from "../constants/fieldOptions.js";

const EditingProfile = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
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
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                city: user.city || "",
                dateOfBirth: user.dateOfBirth || "",
                gender: user.gender || "",
                aboutYourself: user.aboutYourself || "",
                favoriteGenres: user.favoriteGenres || [],
                unlovedGenres: user.unlovedGenres || [],
                favoriteAuthors: user.favoriteAuthors || "",
                favoriteRereadBook: user.favoriteRereadBook || "",
                disappointingBook: user.disappointingBook || "",
                readingFormat: user.readingFormat || [],
                favoriteBookSeries: user.favoriteBookSeries || "",
                readingLanguage: user.readingLanguage || [],
                readingSpeed: user.readingSpeed || [],
                readingTime: user.readingTime || [],
                favoriteReadingPlaces: user.favoriteReadingPlaces || [],
                avatar: user.avatar || null,
            });
        }
    }, [user]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.match('image.*')) {
            alert('Пожалуйста, выберите изображение (JPEG, PNG)');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert('Размер изображения не должен превышать 2MB');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({
                ...prev,
                avatar: reader.result,
            }));
        };
        reader.readAsDataURL(file);

    };

    const handleRemoveAvatar = () => {
        setFormData(prev => ({
            ...prev,
            avatar: null,
        }));
    };

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
            [name]: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleSubmit = () => {
        dispatch(setUser(formData));
    };

    const fieldGroups = [
        {
            title: "Основная информация",
            fields: [
                {
                    label: "Имя",
                    name: "name",
                    type: "text",
                    required: true
                },
                {
                    label: "Город",
                    name: "city",
                    type: "text"
                },
                {
                    label: "Дата рождения",
                    name: "dateOfBirth",
                    type: "date",
                    inputProps: {
                        max: new Date().toISOString().split('T')[0]
                    }
                },
                {
                    label: "Пол",
                    name: "gender",
                    type: "select",
                    options: genderOptions
                },
                {
                    label: "О себе",
                    name: "aboutYourself",
                    type: "multiline",
                    rows: 4,
                    placeholder: "Расскажите о своих интересах, любимых книгах..."
                }
            ]
        },
        {
            title: "Литературные предпочтения",
            fields: [
                {
                    label: "Любимые жанры",
                    name: "favoriteGenres",
                    type: "multiselect",
                    options: genreOptions
                },
                {
                    label: "Нелюбимые жанры",
                    name: "unlovedGenres",
                    type: "multiselect",
                    options: genreOptions
                },
                {
                    label: "Любимые авторы",
                    name: "favoriteAuthors",
                    type: "text",
                    placeholder: "Перечислите через запятую"
                },
                {
                    label: "Самая перечитываемая книга",
                    name: "favoriteRereadBook",
                    type: "text"
                },
                {
                    label: "Книга, которая разочаровала",
                    name: "disappointingBook",
                    type: "text"
                },
                {
                    label: "Формат чтения",
                    name: "readingFormat",
                    type: "multiselect",
                    options: readingFormatOptions
                },
                {
                    label: "Любимая книжная серия",
                    name: "favoriteBookSeries",
                    type: "text"
                },
                {
                    label: "Языки чтения",
                    name: "readingLanguage",
                    type: "multiselect",
                    options: languageOptions
                },
                {
                    label: "Скорость чтения",
                    name: "readingSpeed",
                    type: "select",
                    options: readingSpeedOptions
                },
                {
                    label: "Любимое время чтения",
                    name: "readingTime",
                    type: "multiselect",
                    options: readingTimeOptions
                },
                {
                    label: "Любимое место для чтения",
                    name: "favoriteReadingPlaces",
                    type: "multiselect",
                    options: readingPlacesOptions
                },
            ]
        }
    ];

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Редактирование профиля
            </Typography>

            {fieldGroups.map((group, index) => (
                <FieldEditingForm
                    key={index}
                    group={group}
                    formData={formData}
                    handleChange={handleChange}
                    handleMultiSelectChange={handleMultiSelectChange}
                />
            ))}

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 4,
                gap: 2
            }}>
                <Avatar
                    src={formData.avatar}
                    sx={{
                        width: 120,
                        height: 120,
                        border: '2px solid',
                        borderColor: 'primary.main'
                    }}
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <label htmlFor="avatar-upload">
                        <Button
                            component="span"
                            variant="contained"
                        >
                            {formData.avatar ? 'Изменить' : 'Загрузить'}
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleAvatarChange}
                            />
                        </Button>
                    </label>
                    {formData.avatar && (
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleRemoveAvatar}
                        >
                            Удалить
                        </Button>
                    )}
                </Box>
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