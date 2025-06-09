import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {useDispatch} from "react-redux";
import { addCollection } from "../redux/book/bookSlice.js";

const AddCollectionDialog = (props) => {
    const { open, setOpen } = props
    const dispatch = useDispatch();
    const [collection, setCollection] = useState(
        {
            id: null,
            name: "",
            bookIds: []
        }
    );

    const saveCollection = () => {
        const newCollection = {
            ...collection,
            id: uuidv4()
        }

        dispatch(addCollection(newCollection));
        setOpen(false)
    }
    
    return (
        <Dialog
            open={open}
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
                Добавить новую коллекцию
            </DialogTitle>
            <DialogContent  sx={{background: "#E6CCB2"}}>
                <TextField
                    sx={{width: "100%"}}
                    variant="outlined"
                    label={"Имя"}
                    value={collection.name}
                    onChange={(e) =>
                        setCollection({
                            ...collection,
                            name: e.target.value
                        })
                    }
                />
            </DialogContent>
            <DialogActions
                sx={{
                    background: "#E6CCB2",
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Button
                    onClick={saveCollection}
                    variant="contained"
                    sx={{
                        backgroundColor: '#7F5539',
                        color: '#FFFFFF',
                        width: '30%',
                    }}
                >
                    Создать
                </Button>

                <Button
                    onClick={() => setOpen(false)}
                    sx={{
                        backgroundColor: '#7F5539',
                        color: '#FFFFFF',
                        width: '30%',
                    }}
                >
                    Отменить
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default AddCollectionDialog