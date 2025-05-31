import {Box, Button, Grid, Typography} from "@mui/material";
import { useSelector } from "react-redux";
import ItemBook from "../components/ItemBook.jsx";
import {COLLECTION_GROUP} from "../constants/COLLECTION_GROUP.js";
import EditingCollection from "./EditingCollection.jsx";
import {useState} from "react";

const ListBooks = () => {
    const { books, collectionBooks } = useSelector((state) => state.book);
    const [openCollection, setOpenCollection] = useState(false);

    if (!books || books.length === 0) {
        return (
            <Box textAlign="center" backgroundColor='#F8F4E3'>
                <Typography variant="h5" gutterBottom>
                    Книги не найдены
                </Typography>
            </Box>
        );
    }

    const aaaaa = () => {
        console.log(books.collectionBooks);
    }

    return (
        <Box >
            <Button onClick={aaaaa}>Проверить</Button>
            <Typography variant="h2" align="center" color="white">
                Список прочитанных книг
            </Typography>
            <Box
                backgroundColor='#F8F4E3'
                padding="25px"
                px={{marginTop: "40px"}}
            >

                <Box
                    display="flex"
                    justifyContent="row"
                >
                    <Box width="80%">
                        <Grid container spacing={3} marginTop="2px">
                            {books.map((book) => (
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
                        <Typography variant="body1">
                            Тут будет подборка, сортировка и поиск?
                        </Typography>

                        <Box padding="20px">
                            {COLLECTION_GROUP.map((group) => (
                                <Box key={group.title}>
                                   <Typography>{group.title}</Typography>
                                    {group.fields.map((field) => (
                                        <Button key={field.name}>{field.name}</Button>
                                    ))}
                                </Box>
                            ))}

                            {collectionBooks?.map((collection) => (
                                <Button key={collection.id}>{collection.name}</Button>
                            ))}
                            <Button onClick={() => setOpenCollection(true)}>Добавить коллекцию</Button>

                            <EditingCollection open = {openCollection} setOpen={setOpenCollection} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ListBooks;