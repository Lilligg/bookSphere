import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import AddAvatar from "../components/AddAvatar.jsx";
import {PERSONAGE_FORM_FIELD_GROUP} from "../constants/PERSONAGE_FORM_FIELD_GROUP.js";
import FieldEditingForm from "../components/FieldEditingForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addBookToCollectionById} from "../redux/book/bookSlice.ts";

const AddBookInCollectionDialog = (props) => {
    const { open, onClose, book } = props;
    const dispatch = useDispatch();
    const { collectionBooks } = useSelector((state) => state.book);

    const handleSubmit = (collectionID) => {
        const action = {
            collectionId: collectionID,
            bookId: book.id,
        }
console.log(action)
    dispatch(addBookToCollectionById(action));
        onClose();
    }

    return (
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle textAlign="center"
                             sx={{color: "#7F5539", fontWeight: 700, background: "#E6CCB2",}}
                >Добавить книгу "{book.title}" в коллекцию</DialogTitle>
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
                    <Stack spacing={1} sx={{ mt: 2 }}>
                        {collectionBooks.map((collection) => (
                            <Button
                                key={collection.id}
                                onClick={() => handleSubmit(collection.id)}
                                variant="text"
                                sx={{
                                    textAlign: "left",  // Выравнивание текста
                                    justifyContent: "flex-start",  // Выравнивание содержимого кнопки
                                    backgroundColor: '#baa395',
                                    color: '#000000',
                                    width: "100%",  // Чтобы кнопка занимала всю ширину контейнера
                                }}
                            >
                                {collection.name}
                            </Button>
                        ))}
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ background: "#E6CCB2", display: "flex", justifyContent: "center" }}>
                    <Button sx={{
                        backgroundColor: '#7F5539',
                        color: '#FFFFFF',
                    }} onClick={onClose}>Отмена</Button>
                </DialogActions>
            </Dialog>
    )
}

export default AddBookInCollectionDialog;