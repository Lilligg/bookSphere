import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { addCollection, updateCollection } from "../redux/book/bookSlice.js";

const AddCollectionDialog = ({ open, setOpen, collectionToEdit }) => {
    const dispatch = useDispatch();
    const [collection, setCollection] = useState({
        id: null,
        name: "",
        bookIds: []
    });

    useEffect(() => {
        if (collectionToEdit) {
            setCollection(collectionToEdit);
        } else {
            setCollection({
                id: null,
                name: "",
                bookIds: []
            });
        }
    }, [collectionToEdit, open]);

    const handleClose = () => {
        setOpen(false);
    };

    const saveCollection = () => {
        if (!collection.name.trim()) {
            return;
        }

        if (collectionToEdit) {
            dispatch(updateCollection({
                id: collectionToEdit.id,
                name: collection.name,
            }));
        } else {
            dispatch(addCollection({
                ...collection,
                id: uuidv4()
            }));
        }

        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
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
                {collectionToEdit ? "Редактировать коллекцию" : "Добавить новую коллекцию"}
            </DialogTitle>
            <DialogContent sx={{ background: "#E6CCB2", pt: 3 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Название коллекции"
                    value={collection.name}
                    onChange={(e) => setCollection({
                        ...collection,
                        name: e.target.value
                    })}
                    sx={{ mb: 2 }}
                />
            </DialogContent>
            <DialogActions
                sx={{
                    background: "#E6CCB2",
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    p: 3
                }}
            >
                <Button
                onClick={saveCollection}
                variant="contained"
                sx={{
                    backgroundColor: '#7F5539',
                    color: '#FFFFFF',
                    width: '30%',
                    '&:hover': {
                        backgroundColor: '#5d3d28',
                    }
                }}
            >
                {collectionToEdit ? "Сохранить" : "Создать"}
            </Button>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    sx={{
                        borderColor: '#7F5539',
                        color: '#7F5539',
                        width: '30%',
                        '&:hover': {
                            borderColor: '#5d3d28',
                        }
                    }}
                >
                    Отменить
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddCollectionDialog;