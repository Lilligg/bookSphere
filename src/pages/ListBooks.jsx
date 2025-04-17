import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ItemBook from "../components/ItemBook.jsx";

const ListBooks = () => {
    const { books, isLoading, error } = useSelector((state) => state.book);

    if (isLoading) {
        return <Typography>Загрузка книг...</Typography>;
    }

    if (error) {
        return <Typography color="error">Ошибка: {error}</Typography>;
    }

    if (!books || books.length === 0) {
        return (
            <Box textAlign="center">
                <Typography variant="h5" gutterBottom>
                    Список прочитанных книг
                </Typography>
                <Typography>Книги не найдены</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Список прочитанных книг
            </Typography>

            <Grid container spacing={3}>
                {books.map((book) => (
                    <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
                        <ItemBook book={book} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ListBooks;