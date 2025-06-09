import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import {PERSONAGE_FORM_FIELD_GROUP} from "../constants/PERSONAGE_FORM_FIELD_GROUP.js";
import FieldEditingForm from "../components/FieldEditingForm.jsx";
import {useState} from "react";
import {QUOTE_FORM_FIELD_GROUP} from "../constants/QUOTE_FORM_FIELD_GROUP.js";
import {v4 as uuidv4} from "uuid";

const AddQuoteFormDialog = (props) => {
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
            <DialogTitle textAlign="center"
                         sx={{color: "#7F5539", fontWeight: 700, background: "#E6CCB2",}}>Добавить новую цитату</DialogTitle>
            <DialogContent sx={{
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
            }}>
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
            <DialogActions sx={{ background: "#E6CCB2", display: "flex", justifyContent: "center" }}>

                <Button onClick={handleSubmit} variant="contained" sx={{
                    backgroundColor: '#7F5539',
                    color: '#FFFFFF',
                    width: '30%',
                }}>
                    Добавить
                </Button>
                <Button onClick={onClose} variant="contained" sx={{
                backgroundColor: '#7F5539',
                color: '#FFFFFF',
                width: '30%',
            }}>Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddQuoteFormDialog;