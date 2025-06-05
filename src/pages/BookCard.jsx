import {Box, Typography} from "@mui/material";
import TabBook from "../components/bookCard/TabBook.jsx";
import BookInfo from "../components/bookCard/BookInfo.jsx";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setCurrentBookById} from "../redux/book/bookSlice.js";

const BookCard = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const currentBook = useSelector((state) => state.book.currentBook);


    useEffect(() => {
        if (id) {
            dispatch(setCurrentBookById(id));
        }
    }, [id, dispatch]);

    if (!currentBook) {
        return <Box p={3}>Загрузка данных книги...</Box>;
    }

    return (
        <Box padding="25px">
            <BookInfo currentBook={currentBook}/>
            <Box backgroundColor = '#D4D4D4' display="flex" flexDirection="row" sx={{opacity:"0.97", marginTop: "50px"}}>
                <Box>
                    <TabBook currentBook={currentBook}/>
                </Box>
                <Box width="40%" marginTop="20px">
                    <Typography variant="body1" align="center">
                       Статус: {}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default BookCard