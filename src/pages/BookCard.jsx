import { Typography } from "@mui/material";
import TabBook from "../components/bookCard/TabBook.jsx";
import BookInfo from "../components/bookCard/BookInfo.jsx";

const BookCard = () => {
    return (
        <>
            <Typography variant="h2" color="textSecondary">Тут будет карточка книги</Typography>
            <BookInfo/>
            <TabBook/>
        </>
    )
}

export default BookCard