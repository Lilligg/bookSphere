import {Box, Button, Divider, Grid, IconButton, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import ItemBook from "../components/ItemBook.jsx";
import {SORT_BUTTON_GROUP} from "../constants/SORT_BUTTON_GROUP.js";
import AddCollectionDialog from "./AddCollectionDialog.jsx";
import {useEffect, useState} from "react";
import ButtonSort from "../components/ButtonSort.jsx";
import {setListBooks, setSortConfig} from "../redux/book/bookSlice.js";
import SelectField from "../components/SelectField.jsx";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from '@mui/icons-material/Add';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const ListBooks = () => {
    const { collectionBooks, listBooks, books } = useSelector((state) => state.book);
    const [openCollection, setOpenCollection] = useState(false);
    const dispatch = useDispatch();
    const [typeCollection, setTypeCollection] = useState("allBooks");


    useEffect(() => {
        if (typeCollection === "allBooks") {
            dispatch(setListBooks("allBooks"))
        }
       else {
            dispatch(setListBooks(typeCollection));
        }
    }, [books, typeCollection]);

    const handleCollectionClick = (name) => {
        setTypeCollection(name);
        dispatch(setListBooks({
            collectionName: name,
            resetSort: false // сохраняем сортировку
        }));
    }

    const handleResetFilters = () => {
        setTypeCollection("allBooks");
        dispatch(setListBooks({
            collectionName: "allBooks",
            resetSort: true
        }));

        // Дополнительно сбрасываем сортировку в UI
        dispatch(setSortConfig({
            key: 'title',
            direction: 'asc'
        }));
    }

    return (
        <Box>
            <Typography variant="h2" align="center" color="#553924" >
               Моя библиотека
            </Typography>
            <Box
                backgroundColor='#E6CCB2'
                padding="25px"
                px={{ marginTop: "40px", borderRadius:"10px", boxShadow: '3', }}
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
                    <Divider orientation="vertical" flexItem sx={{
                        margin: '0 20px', // отступы по бокам
                        borderRightWidth: '2px', // толщина линии
                    }} />
                    <Box
                        width="20%"
                        marginLeft="20px"
                        marginTop="20px"
                    >
                        <Button fullWidth variant="contained"
                                sx={{
                                    marginBottom: '10px',
                                    fontWeight: 700,
                            fontSize: '15px',
                            color: "#E6CCB2",
                            backgroundColor: '#553924',
                        }} onClick={handleResetFilters}>
                            Сбросить фильтры
                        </Button>
                        <Typography variant="h6" align="center" gutterBottom>
                            Сортировка <SwapVertIcon
                            fontSize="medium"
                            sx={{
                                color: "#7F5539",}}
                        />
                        </Typography>

                        <ButtonSort configuration = {SORT_BUTTON_GROUP}/>

                            <Typography component="div" variant="h6" align="center" gutterBottom>
                                Коллекции <LibraryAddIcon
                                    fontSize="medium"
                                    sx={{
                                        color: "#7F5539",}}
                                />
                            </Typography>



                            {collectionBooks.map((collection) => (
                                <Box>
                                <Button
                                    key={collection.id}
                                    fullWidth
                                    variant="text"
                                    sx={{
                                        marginTop: "2px",
                                        paddingLeft: "15px",
                                        justifyContent: 'flex-start',
                                        textAlign: 'left',
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        fontSize: '15px',
                                        color: "#7F5539",
                                        backgroundColor: '#E6CCB2',
                                        borderLeft: typeCollection === collection.name ? '4px solid #7F5539' : '4px solid transparent',
                                    }}
                                    onClick={() => handleCollectionClick(collection.name)}
                                >
                                    {collection.name}
                                </Button>

                                <Divider />
                                </Box>
                            ))}

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    marginTop: '10px',
                                    fontWeight: 700,
                                    color: "#E6CCB2",
                                    backgroundColor: '#553924',
                                }}
                                onClick={() => setOpenCollection(true)}

                            >
                                Добавить коллекцию
                            </Button>
                        </Box>
                    </Box>
                </Box>
            <AddCollectionDialog open={openCollection} setOpen={setOpenCollection} />
        </Box>
    );
};

export default ListBooks;