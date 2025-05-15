import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { PERSONAGE_FORM_FIELD_GROUP } from "../../constants/PERSONAGE_FORM_FIELD_GROUP.js";
import FieldEditingForm from "../FieldEditingForm.jsx";
import AddAvatar from "../AddAvatar.jsx";

const INITIAL_FORM_PERSONAGE = {
    id: "",
    name: "",
    avatar: null,
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
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Добавить нового персонажа</DialogTitle>
            <DialogContent>
                <AddAvatar
                    formData={personage}
                    setFormData={setPersonage}
                    title="Загрузите фото персонажа"
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
            <DialogActions>
                <Button onClick={onClose}>Отмена</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Добавить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddPersonageForm;