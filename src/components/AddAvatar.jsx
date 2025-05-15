import {Avatar, Box, Button, Typography} from "@mui/material";

const AddAvatar = (props) => {
    const {formData, setFormData, title} = props;

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
            console.log(reader.result);
        };

        reader.readAsDataURL(file);
        console.log(formData);
    };

    const handleRemoveAvatar = () => {
        setFormData(prev => ({
            ...prev,
            avatar: null,
        }));
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 4,
            gap: 2,
            width: "30%",
        }}>
            <Typography variant="h6">{title}</Typography>
            <Avatar
                src={formData.avatar}
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
    )
}

export default AddAvatar;