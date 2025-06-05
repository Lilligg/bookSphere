import {Box, Button, Dialog, TextField} from "@mui/material";
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {useDispatch} from "react-redux";
import {addCollection} from "../redux/book/bookSlice.js";

const EditingCollectionDialog = (props) => {
    const { open, setOpen } = props
    const dispatch = useDispatch();
    const [collection, setCollection] = useState(
        {
            id: null,
            name: "",
            collection: []
        }
    );


    const saveCollection = () => {
        const newCollection = {
            ...collection,
            id: uuidv4()
        }

        console.log(newCollection);
        dispatch(addCollection(newCollection));
        setOpen(false)
    }
    
    return (
        <Dialog open={open}>
            <TextField 
                label={"Имя"} 
                value={collection.name} 
                onChange={(e) =>
                    setCollection({
                        ...collection,
                        name: e.target.value
                })
            }
            />
            <Button onClick={ saveCollection }>Создать коллекцию</Button>
            <Button onClick={() => setOpen(false)}>Отменить</Button>
        </Dialog>
    )
}
export default EditingCollectionDialog