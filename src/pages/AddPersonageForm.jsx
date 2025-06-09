import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { PERSONAGE_FORM_FIELD_GROUP } from "../constants/editingBook/PERSONAGE_FORM_FIELD_GROUP.js";
import FieldEditingForm from "../components/FieldEditingForm.jsx";
import AddAvatar from "../components/AddAvatar.jsx";

const INITIAL_FORM_PERSONAGE = {
    id: "",
    name: "",
    avatar: null,
    gender: "",
    characterStatus: "",
    appearance: "",
    character: "",
    description: ""
}

const AddPersonageForm = (props) => {
    const { setFormData, open, onClose } = props;
    const [personage, setPersonage] = useState(INITIAL_FORM_PERSONAGE);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonage(prev => ({ ...prev, [name]: value }));
    };

    const avatarChange = (avatar) => {
        setPersonage(prev => ({
            ...prev,
            avatar: avatar,
        }))
    }

    const handleSubmit = () => {
        const newPersonage = {
            ...personage,
            id: uuidv4()
        };

        onClose();
        setFormData(prev => ({
            ...prev,
            personages: [...prev.personages, newPersonage]
        }));

        setPersonage(INITIAL_FORM_PERSONAGE)
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
        >
            <DialogTitle
                textAlign="center"
                sx={{
                    color: "#7F5539",
                    fontWeight: 700,
                    background: "#E6CCB2",
                }}
            >
                Добавить нового персонажа
            </DialogTitle>

            <DialogContent
                sx={{
                    background: "#E6CCB2",
                    '&::-webkit-scrollbar': {
                        width: '10px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#E6CCB2',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#7F5539',
                        borderRadius: '5px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#5d3d28',
                    },
                    scrollbarWidth: 'thin', // для Firefox
                    scrollbarColor: '#7F5539 #E6CCB2', // для Firefox
                }}
            >
                <AddAvatar
                    title="Загрузите фото персонажа"
                    type="typePersonBook"
                    onAvatarChange={avatarChange}
                    propAvatar={personage.avatar}
                />
                <Stack spacing={2} sx={{ mt: 2 }}>
                    {PERSONAGE_FORM_FIELD_GROUP.map((group, index) => (
                        <FieldEditingForm
                            key={index}
                            group={group}
                            formData={personage}
                            handleChange={handleChange}
                        />
                    ))}
                </Stack>
            </DialogContent>
            <DialogActions
                sx={{
                    background: "#E6CCB2",
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                        backgroundColor: '#7F5539',
                        color: '#FFFFFF',
                        width: '30%',
                    }}
                >
                    Добавить
                </Button>
                <Button
                    onClick={onClose}
                    sx={{
                        backgroundColor: '#7F5539',
                        color: '#FFFFFF',
                        width: '30%',
                    }}
                >
                    Отмена
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddPersonageForm;