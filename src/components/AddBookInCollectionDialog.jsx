import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import AddAvatar from "./AddAvatar.jsx";
import {PERSONAGE_FORM_FIELD_GROUP} from "../constants/PERSONAGE_FORM_FIELD_GROUP.js";
import FieldEditingForm from "./FieldEditingForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addBookToCollectionById} from "../redux/book/bookSlice.js";

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
                <DialogTitle>Добавить книгу {book.title} в коллекцию</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        {collectionBooks.map((collection) => (
                            <Button
                                key={collection.id}
                                onClick={(() => handleSubmit(collection.id))}
                            >
                                {collection.name}
                            </Button>
                        ))}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Отмена</Button>
                </DialogActions>
            </Dialog>
    )
}

export default AddBookInCollectionDialog;