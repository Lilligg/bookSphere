import {Avatar, Box, Button, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {setCurrentBookById, updateBookAvatar} from "../redux/book/bookSlice.js";
import {useParams} from "react-router-dom";
import {updateUserAvatar} from "../redux/user/userSlice.js";

const AddAvatar = (props) => {
    const { title, type, propAvatar, onAvatarChange } = props;

    const [avatar, setAvatar] = useState(null);

    const dispatch = useDispatch();
    const { id } = useParams();
    const { currentBook } = useSelector((state) => state.book);
    const { user } = useSelector((state) => state.user);

    let currentAvatar;
    if (type === "typeUser") {
        currentAvatar = user?.avatar;
    }
    else if (type === "typeBook") {
        currentAvatar = currentBook?.avatar;
    }
    else if (type === "typeNewBook") {
        currentAvatar = avatar;
    }
    else if (type === "typePersonBook") {
        currentAvatar = propAvatar;
    }

    const hasAvatar = !!currentAvatar;

    useEffect(() => {
        if (id && type === "typeBook") {
            dispatch(setCurrentBookById(id));
        }
    }, [id, type, dispatch]);

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
            const avatar = reader.result;
            if (type === "typeUser") {
                dispatch(updateUserAvatar(avatar))
            }
            else if (type === "typeBook") {
                dispatch(updateBookAvatar({
                    id: currentBook.id,
                    avatar: avatar
                }))
            }
            else if (type === "typeNewBook") {
                setAvatar(avatar)
                if (onAvatarChange) {
                    onAvatarChange(avatar);
                }
            }
            else if (type === "typePersonBook") {
                setAvatar(avatar)
                onAvatarChange(avatar);
            }
        };

        reader.readAsDataURL(file);
    };

    const handleRemoveAvatar = () => {
        if (type === "typeUser") {
            dispatch(updateUserAvatar(null))
        }
        else if (type === "typeBook") {
            dispatch(updateBookAvatar({
                id: currentBook.id,
                avatar: null
            }));
        }
        else if (type === "typeNewBook" || type === "typePersonBook") {
            setAvatar(null)
            if (onAvatarChange) {
                onAvatarChange(null);
            }
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4,
            gap: 2,
        }}>
            <Typography variant="h6">{title}</Typography>
            <Avatar
                src={currentAvatar}
                sx={{
                    width: 150,
                    height: 150,
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
                        {hasAvatar ? 'Изменить' : 'Загрузить'}
                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleAvatarChange}
                        />
                    </Button>
                </label>
                {hasAvatar && (
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
    )
}

export default AddAvatar;