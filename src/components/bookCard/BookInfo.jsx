import { Box } from "@mui/material";
import { useEffect } from "react";
import logo from "../../assets/assets.png";
import { Rating } from "@mui/lab";
import InformPanel from "../InformPanel.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCurrentBookById } from "../../redux/book/bookSlice.js";
import { MAIN_INFORMATION_BOOK } from "../../constants/bookCard/MAIN_INFORMATION_BOOK.js";

const BookInfo = () => {
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

    const mainInfoBook = MAIN_INFORMATION_BOOK(currentBook);

    return(
        <Box display="flex" flexDirection="row">
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: '50%',
                justifyContent: "center" }}
            >
                <Box
                    component="img"
                    src={logo}
                    alt="Аватар"
                    sx={{ width: '50%' }}
                />
                <Rating name="overall-score" defaultValue={2.5} precision={0.5} readOnly /> {/*в данном случае цифры - просто заглушка*/}
            </Box>
            <Box>
                <InformPanel data={mainInfoBook} />
            </Box>
        </Box>
    )
}

export default BookInfo;