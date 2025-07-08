import {Box, Button, Divider, Grid, IconButton, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import MiniBookCard from "../components/MiniBookCard.jsx";
import {SORT_BUTTON_GROUP} from "../constants/SORT_BUTTON_GROUP.js";
import AddCollectionDialog from "./AddCollectionDialog.jsx";
import {useEffect, useState} from "react";
import ButtonSort from "../components/ButtonSort.jsx";
import {removeCollection, searchBook, setListBooks, setSortConfig} from "../redux/book/bookSlice.js";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from '@mui/icons-material/Search';

const ListBooks = () => {
    const dispatch = useDispatch();
    const { collectionBooks, listBooks, lastUpdated } = useSelector((state) => state.book);
    const [openCollection, setOpenCollection] = useState(false);
    const [typeCollection, setTypeCollection] = useState("allBooks");
    const [editingCollection, setEditingCollection] = useState(null);
    const [titlePage, setTitlePage] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (typeCollection === "allBooks") {
            dispatch(setListBooks("allBooks"))
        }
        else {
            dispatch(setListBooks(typeCollection));
        }
    }, [lastUpdated, typeCollection, dispatch]);

    const handleCollectionClick = (name) => {
        setTypeCollection(name);
        dispatch(setListBooks({
            collectionName: name,
            resetSort: false
        }));
        setTitlePage(name);
    }

    const handleResetFilters = () => {
        setTypeCollection("allBooks");
        dispatch(setListBooks({
            collectionName: "allBooks",
            resetSort: true
        }));

        dispatch(setSortConfig({
            key: 'title',
            direction: 'asc'
        }));
        setTitlePage("");
        setSearch("");
    }

    const handleEditCollection = (collection) => {
        setEditingCollection(collection);
        setOpenCollection(true);
    }

    const deleteCollection = (idCollection) => {
        dispatch(removeCollection(idCollection))
    }

    const searchClick = () => {
        dispatch(searchBook(search))
    }

    return (
        <Box>
            <Typography variant="h2" align="center" color="#553924">
                Моя библиотека
            </Typography>
            <Stack
                direction="row"
                backgroundColor='#E6CCB2'
                padding="25px"
                sx={{ marginTop: "40px", borderRadius: "10px", boxShadow: 3 }}
            >
                {/*Основной контент - список книг*/}
                <Box sx={{ width: "80%" }}>
                    <Typography
                        variant="h4"
                        align="center"
                        color="#553924"
                        sx={{ mb: 3 }}
                    >
                        {titlePage ? `Коллекция: «${titlePage}»` : 'Все книги'}
                    </Typography>
                    <Grid container spacing={3}>
                        {listBooks?.map((book) => (
                            <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
                                <MiniBookCard book={book} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            margin: '0 20px',
                            borderRightWidth: '2px',
                        }}
                    />
                {/*Боковая панель*/}
                    <Box
                        sx={{
                            width: { xs: "30%", md: "20%" },
                            top: { xs: 0, md: 'auto' },
                        }}
                    >
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                marginBottom: '10px',
                                fontWeight: 700,
                                fontSize: '15px',
                                color: "#E6CCB2",
                                backgroundColor: '#553924',
                                '&:hover': {
                                    backgroundColor: '#7F5539',
                                }
                            }}
                            onClick={handleResetFilters}
                        >
                            Сбросить фильтры
                        </Button>

                        {/*Поиск*/}
                        <TextField
                            label="Поиск"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => searchClick()}
                                            sx={{ color: '#7F5539' }}
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#553924',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#553924',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#7F5539',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#7F5539',
                                },
                                mt: 2,
                                mb: 2
                            }}
                        />

                        {/*Сортировка*/}
                        <Typography
                        variant="h6"
                        align="center"
                        gutterBottom
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        Сортировка
                        <SwapVertIcon fontSize="medium" sx={{color: "#7F5539", ml: 1}}/>
                    </Typography>
                        <ButtonSort configuration={SORT_BUTTON_GROUP}/>
                        {/*Коллекции*/}
                        <Typography
                            variant="h6"
                            align="center"
                            gutterBottom
                            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            Коллекции
                            <LibraryAddIcon fontSize="medium" sx={{color: "#7F5539", ml: 1}}/>
                        </Typography>

                        {collectionBooks.map((collection) => (
                            <Box
                                key={collection.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    '&:hover': {
                                        backgroundColor: '#D4B28C',
                                    },
                                    borderLeft: typeCollection === collection.name ? '4px solid #7F5539' : '4px solid transparent',
                                }}
                            >
                                <Button
                                    fullWidth
                                    variant="text"
                                    sx={{
                                        paddingLeft: "15px",
                                        justifyContent: 'flex-start',
                                        textAlign: 'left',
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        fontSize: '15px',
                                        color: "#7F5539",
                                        backgroundColor: 'transparent',
                                        flexGrow: 1,
                                    }}
                                    onClick={() => handleCollectionClick(collection.name)}
                                >
                                    {collection.name}
                                </Button>

                                <Box sx={{ display: 'flex' }}>
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEditCollection(collection);
                                        }}
                                        sx={{ color: "#7F5539" }}
                                    >
                                        <EditIcon fontSize="small"/>
                                    </IconButton>
                                    <IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteCollection(collection.id);
                                        }}
                                        sx={{ color: "#7F5539" }}
                                    >
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                </Box>
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
                                '&:hover': {
                                    backgroundColor: '#7F5539',
                                }
                            }}
                            onClick={() => {
                                setEditingCollection(null);
                                setOpenCollection(true);
                            }}
                        >
                            Добавить коллекцию
                        </Button>
                    </Box>
                </Stack>
            <AddCollectionDialog
                open={openCollection}
                setOpen={setOpenCollection}
                collectionToEdit={editingCollection}
            />
            </Box>


    );
};

export default ListBooks;