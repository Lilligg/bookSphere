import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import {PERSONAGE_FORM_FIELD_GROUP} from "../../constants/PERSONAGE_FORM_FIELD_GROUP.js";
import FieldEditingForm from "../FieldEditingForm.jsx";
import {useState} from "react";
import {QUOTE_FORM_FIELD_GROUP} from "../../constants/QUOTE_FORM_FIELD_GROUP.js";
import {v4 as uuidv4} from "uuid";

const AddQuoteForm = (props) => {
    const { setFormData, open, onClose } = props;
    const [quotes, setQuotes] = useState({
        person: "",
        text: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuotes(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const newQuotes = {
            ...quotes,
            id: uuidv4()
        };

        onClose();

        setQuotes({
            name: '',
            avatar: '',
            characterStatus: '',
            appearance: '',
            character: '',
            description: ''
        });

        setFormData(prev => ({
            ...prev,
            quotes: [...prev.quotes, newQuotes]
        }));
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Добавить новую цитату</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 2 }}>
                    {QUOTE_FORM_FIELD_GROUP.map((group, index) => (
                        <FieldEditingForm
                            key={index}
                            group={group}
                            formData={quotes}
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
    )
}

export default AddQuoteForm;