import {
    Box,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import imgBook from "../assets/noBook.jpg";
import { Link } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState} from "react";
import AddBookInCollectionDialog from "../pages/AddBookInCollectionDialog.jsx";
import {useDispatch} from "react-redux";
import {removeBook} from "../redux/book/bookSlice.js";

const ItemBook = (props) => {
    const { book } = props;
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialogAddBookCollection , setOpenDialogAddBookCollection] = useState(false);

    const open = Boolean(anchorEl);
    const rating = book.overallRating;
    const roundedRating = rating % 1 === 0 ? rating : rating.toFixed(1);

    const handleClickOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleCloseDialogAddBookCollection = () => {
        setOpenDialogAddBookCollection(false);
    }

    const handleDialogCollection = () => {
        setOpenDialogAddBookCollection(true);
    }

    const removeBookClick = () => {
        handleCloseMenu();

        const isConfirmed = window.confirm(
            `Вы действительно хотите удалить книгу "${book.title}"? Отменить это действие будет невозможно.`
        );

        if (isConfirmed) {
            dispatch(removeBook(book.id));
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
            component="div"
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: 'relative',
                background: 'transparent',
                overflow: 'visible',
                boxShadow: 'none',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.03)'
                }
            }}
        >
            <Link
                to={`/bookCard/${book.id}`}
                style={{
                    textDecoration: 'none',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
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
                        color: 'text.primary',
                    }}>
                        {book.title || "Без названия"}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            mt: 0.5,
                            fontSize: '0.875rem',
                            lineHeight: 'inherit',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: 'text.secondary',
                        }}
                    >
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
                            color="white"
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
                            color="white"
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

        <IconButton
            aria-label="menu"
            sx={{
                position: 'absolute',
                right: -12,
                top: 255,
                zIndex: 3,
            }}
            onClick={handleClickOpenMenu}
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
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleDialogCollection}>Добавить в коллекцию</MenuItem>
                <MenuItem onClick={removeBookClick}>Удалить</MenuItem>
            </Menu>

            <AddBookInCollectionDialog book={book} open={openDialogAddBookCollection} onClose={handleCloseDialogAddBookCollection} />
        </Card>
    );
};

export default ItemBook;