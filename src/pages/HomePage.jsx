import { Box } from "@mui/material";
import { useSelector} from "react-redux";
import BooksCollection from "../components/BooksCollection.jsx";
import {getRandomUniqueBooks} from "../function/getRandomUniqueBooks.js";

const HomePage = () => {
    const {books} = useSelector((state) => state.book);
    const readBooks = books.filter(book => book.statistics.status === "Завершен");
    const frozenBooks = books.filter(book => book.statistics.status === "Заморожено");
    const inProcess = books.filter(book => book.statistics.status === "В процессе");
    const inThePlans = books.filter(book => book.statistics.status === "В планах");


    return (
        <Box>
            <BooksCollection books={getRandomUniqueBooks(inProcess)} title={"Продолжим читать?"}/>
            <BooksCollection books={getRandomUniqueBooks(frozenBooks)} title={"Не хотите возобновить чтение?"}/>
            <BooksCollection books={getRandomUniqueBooks(readBooks)} title={"Вспомним уже прочитанное?"}/>
            <BooksCollection books={getRandomUniqueBooks(inThePlans)} title={"Что-нибудь новое?"}/>
        </Box>
    )
}

export default HomePage;