import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const ListBooks = () => {
    return (
        <>
            <Typography variant="h2" color="textSecondary">Тут будет список книг</Typography>
            <Link to={"/BookCard"}><Button>Кнопка перехода на  опеределенную книгу</Button></Link>
        </>
    )
}
export default ListBooks