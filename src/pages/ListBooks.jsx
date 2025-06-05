import { Box, Button, Grid, Typography } from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import ItemBook from "../components/ItemBook.jsx";
import {SORT_BUTTON_GROUP} from "../constants/SORT_BUTTON_GROUP.js";
import EditingCollectionDialog from "./EditingCollectionDialog.jsx";
import {useEffect, useState} from "react";
import ButtonSort from "../components/ButtonSort.jsx";
import {setListBooks} from "../redux/book/bookSlice.js";

const ListBooks = () => {
    const { collectionBooks, listBooks } = useSelector((state) => state.book);
    const [openCollection, setOpenCollection] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setListBooks("allBooks"))
    }, [])

    const handleCollectionClick = (name) => {
        dispatch(setListBooks(name));
    }

    return (
        <Box>
            <Typography variant="h2" align="center" color="white">
                Список прочитанных книг
            </Typography>
            <Box
                backgroundColor='#F8F4E3'
                padding="25px"
                px={{ marginTop: "40px" }}
            >
                <Box display="flex" justifyContent="row">
                    <Box width="80%">
                        <Grid container spacing={3} marginTop="2px">
                            {listBooks?.map((book) => (
                                <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
                                    <ItemBook book={book} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Box
                        width="20%"
                        marginLeft="20px"
                        marginTop="20px"
                        backgroundColor='#E0DFDF'
                    >
                        <Typography variant="h6" gutterBottom>
                            Сортировка
                        </Typography>

                        <ButtonSort configuration = {SORT_BUTTON_GROUP}/>

                            <Typography variant="h6" gutterBottom mt={4}>
                                Коллекции
                            </Typography>

                            <Button fullWidth sx={{ mb: 1 }} onClick={() => handleCollectionClick("allBooks")}>
                                Все книги
                            </Button>

                            {collectionBooks.map((collection) => (
                                <Button key={collection.id} fullWidth sx={{ mb: 1 }} onClick={() => handleCollectionClick(collection.name)}>
                                    {collection.name}
                                </Button>
                            ))}

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => setOpenCollection(true)}
                                sx={{ mt: 2 }}
                            >
                                Добавить коллекцию
                            </Button>
                        </Box>
                    </Box>
                </Box>
            <EditingCollectionDialog open={openCollection} setOpen={setOpenCollection} />
        </Box>
    );
};

export default ListBooks;