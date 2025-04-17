import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addPersonage } from '../redux/book/bookSlice';
import { v4 as uuidv4 } from 'uuid';


const AddPersonageForm = ({ bookId, open, onClose }) => {
    const dispatch = useDispatch();
    const [personage, setPersonage] = useState({
        name: '',
        avatar: '',
        characterStatus: '',
        appearance: '',
        character: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonage(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const newPersonage = {
            ...personage,
            id: uuidv4()
        };
        dispatch(addPersonage({ bookId, personage: newPersonage }));
        onClose();
        setPersonage({
            name: '',
            avatar: '',
            characterStatus: '',
            appearance: '',
            character: '',
            description: ''
        });
    };


    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Добавить нового персонажа</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        name="name"
                        label="Имя персонажа"
                        value={personage.name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        name="avatar"
                        label="Ссылка на изображение"
                        value={personage.avatar}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        name="characterStatus"
                        label="Статус персонажа"
                        value={personage.characterStatus}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        name="appearance"
                        label="Внешность"
                        value={personage.appearance}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={2}
                    />
                    <TextField
                        name="character"
                        label="Характер"
                        value={personage.character}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={2}
                    />
                    <TextField
                        name="description"
                        label="Описание"
                        value={personage.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                    />
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