import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ItemBook from "../components/ItemBook.jsx";

const ListBooks = () => {
    const { books } = useSelector((state) => state.book);

    if (!books || books.length === 0) {
        return (
            <Box textAlign="center" backgroundColor='#F8F4E3'>
                <Typography variant="h5" gutterBottom>
                    Книги не найдены
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            backgroundColor='#F8F4E3'
            padding="25px"
        >
            <Typography variant="h4" align="center">
                Список прочитанных книг
            </Typography>
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
                </Box>
            </Box>
        </Box>
    );
};

export default ListBooks;