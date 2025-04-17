import {Box, Typography} from "@mui/material";
import React, {useEffect} from "react";
import logo from "../../assets/assets.png";
import {Rating} from "@mui/lab";
import InformPanel from "../InformPanel.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {setCurrentBookById} from "../../redux/book/bookSlice.js";

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

    const mainInfo = [
        { label: "Название", value: currentBook.title || "Не указано" },
        { label: "Автор", value: currentBook.author || "Не указан" },
        { label: "Год публикации", value: currentBook.yearPublication || "Не указан" },
    ];

    return(
        <Box display="flex" flexDirection="row">
            <Box sx={{display: "flex", flexDirection: "column", width: '50%', justifyContent: "center"}}>
                <Box
                    component="img"
                    src={logo}
                    alt="Аватар"
                    sx={{ width: '50%', }}
                />
                <Rating name="overall-score" defaultValue={2.5} precision={0.5} readOnly />
                <Typography></Typography>
            </Box>
            <Box>
                <InformPanel data={mainInfo} />
            </Box>
        </Box>
    )
}
export default BookInfo;