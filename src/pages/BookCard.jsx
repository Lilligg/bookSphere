import {Box, Typography} from "@mui/material";
import BookInfo from "../components/bookCard/BookInfo.jsx";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setCurrentBookById} from "../redux/book/bookSlice.js";
import CustomTabs from "../components/CustomTabs.jsx";
import {BOOK_TABS} from "../constants/bookCard/BOOK_TABS.jsx";

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
        <Box marginTop="25px">
            <BookInfo currentBook={currentBook}/>

            <Box
                display="flex"
                flexDirection="row"
                sx={{
                    marginTop: '40px',
                    backgroundColor: '#E6CCB2'
                }}
            >
                <Box width="100%">
                    <CustomTabs data = {BOOK_TABS(currentBook)}/>
                </Box>

            </Box>
        </Box>
    )
}

export default BookCard