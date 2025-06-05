import {Button, Card, CardHeader, CardMedia, IconButton, Menu, MenuItem} from "@mui/material";
import imgBook from "../assets/noBook.jpg";
import { Link } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {USER_MENU} from "../constants/navigation/USER_MENU.js";
import {useState} from "react";
import AddBookInCollectionDialog from "./AddBookInCollectionDialog.jsx";

const ItemBook = (props) => {
    const { book } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog , setOpenDialog] = useState(false);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleDialog = () => {
        setOpenDialog(true);
    }

    return (
        <Card
            component="div" // Меняем Link на обычный div
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: 'relative',
                cursor: 'pointer' // Добавляем курсор для интерактивности
            }}
        >
            {/* Обёртка для ссылки */}
            <Link
                to={`/bookCard/${book.id}`}
                style={{
                    textDecoration: 'none',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Содержимое карточки */}
                <CardMedia
                    component="img"
                    sx={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    image={book.avatar || imgBook}
                    alt={book.title}
                />
                <CardHeader
                    title={book.title || "Без названия"}
                    subheader={book.author || "Автор не указан"}
                />
            </Link>

            {/* Кнопка меню теперь вне ссылки */}
            <IconButton
                aria-label="menu"
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    zIndex: 1,
                }}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleDialog}>Добавить в коллекцию</MenuItem>
            </Menu>

            <AddBookInCollectionDialog book={book} open={openDialog} onClose={handleCloseDialog} />
        </Card>
    );
};

export default ItemBook;