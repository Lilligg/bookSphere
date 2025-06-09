import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import imgBook from "../assets/noBook.jpg";
import { Link } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {USER_MENU} from "../constants/navigation/USER_MENU.js";
import {useState} from "react";
import AddBookInCollectionDialog from "../pages/AddBookInCollectionDialog.jsx";
import {useDispatch} from "react-redux";
import {removeBook} from "../redux/book/bookSlice.js";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

const ItemBook = (props) => {
    const { book } = props;
    const dispatch = useDispatch();
    const rating = book.overallRating;
    const roundedRating = rating % 1 === 0 ? rating : rating.toFixed(1);

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

    const removeBookClick = () => {
        handleClose();

        const isConfirmed = window.confirm(
            `Вы действительно хотите удалить книгу "${book.title}"? Отменить это действие будет невозможно.`
        );

        if (isConfirmed) {
            dispatch(removeBook(book.id));
            console.log("Elfkztv");
        }
    }

    const getRatingColor = (rating) => {
        if (rating <= 2) return '#F44336';
        if (rating <= 3.5) return '#fbc53c';
        return '#3cb543';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "В процессе":
                return '#2362df';
            case "Завершен":
                return '#df263c';
            case "Заморожено":
                return '#79797a';
            case "В планах":
                return '#3cb543';
        }
    };

    return (
        <Card
            component="div" // Меняем Link на обычный div
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: 'relative',
                background: 'transparent',
                cursor: 'pointer', // Добавляем курсор для интерактивности
                overflow: 'visible', // Разрешаем выход содержимого за границы
                boxShadow: 'none',
                transition: 'transform 0.2s', // Анимация при наведении
                '&:hover': {
                    transform: 'scale(1.03)' // Увеличение при наведении
                }
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
                    sx={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: "10px", boxShadow: '3',}}
                    image={book.avatar || imgBook}
                    alt={book.title}
                />
                <CardContent sx={{
                    p: 0,
                    pt: 0.5,
                    pb: 0.5,
                    textAlign: 'left',
                    lineHeight: 1.2,
                    marginRight: '15px'
                }}>
                    <Typography variant="h6" component="div" sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        lineHeight: 'inherit',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        color: 'text.primary', // Явно задаем цвет текста
                    }}>
                        {book.title || "Без названия"}
                    </Typography>
                    <Typography variant="body2" sx={{ // Убрали color="text.secondary"
                        mt: 0.5,
                        fontSize: '0.875rem',
                        lineHeight: 'inherit',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: 'text.secondary', // Явно задаем цвет через sx
                    }}>
                        {book.author || "Автор не указан"}
                    </Typography>
                </CardContent>

                {book.overallRating > 0 && (
                    <Box
                        sx={{
                            width: '30px',
                            height: '18px',
                            position: 'absolute',
                            left: -9,
                            top: 8,
                            backgroundColor: getRatingColor(book.overallRating),
                            borderRadius: '3px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                            zIndex: 2
                        }}
                    >
                        <Typography
                            color="white"  // Изменил на white для лучшей читаемости
                            sx={{
                                fontSize: '12px',
                                fontWeight: 'bold',
                                lineHeight: 1,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                            }}
                        >
                            {roundedRating}
                        </Typography>
                    </Box>
                )}

                {book.statistics.status !== 0 && (
                    <Box
                        sx={{
                            width: '79px',
                            height: '20px',
                            position: 'absolute',
                            right: 6,
                            top: 8,
                            backgroundColor: getStatusColor(book.statistics.status),
                            borderRadius: '3px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                            zIndex: 2
                        }}
                    >
                        <Typography
                            color="white"  // Изменил на white для лучшей читаемости
                            sx={{
                                fontSize: '12px',
                                fontWeight: 'bold',
                                lineHeight: 1,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                            }}
                        >
                            {book.statistics.status}
                        </Typography>
                    </Box>
                )}
            </Link>


            {/* Кнопка меню теперь вне ссылки */}
            <IconButton
                aria-label="menu"
                sx={{
                    position: 'absolute',
                    right: -12,
                    top: 255,
                    zIndex: 3,
                }}
                onClick={handleClick}
            >
                <MoreVertIcon
                    fontSize="medium"
                    sx={{
                     color: "#7F5539",}}
                    />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleDialog}>Добавить в коллекцию</MenuItem>
                <MenuItem onClick={handleDialog}>Изменить</MenuItem>
                <MenuItem onClick={removeBookClick}>Удалить</MenuItem>
            </Menu>

            <AddBookInCollectionDialog book={book} open={openDialog} onClose={handleCloseDialog} />
        </Card>
    );
};

export default ItemBook;