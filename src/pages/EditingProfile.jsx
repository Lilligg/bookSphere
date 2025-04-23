import { Avatar, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/user/userSlice.js";
import FieldEditingForm from "../components/FieldEditingForm.jsx";
import {EDITING_PROFILE_FIELD_GROUPS} from "../constants/EDITING_PROFILE_FIELD_GROUPS.js";

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

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Редактирование профиля
            </Typography>

            {EDITING_PROFILE_FIELD_GROUPS.map((group, index) => (
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