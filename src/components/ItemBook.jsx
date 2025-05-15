import { Card, CardHeader, CardMedia } from "@mui/material";
import imgBook from "../assets/noBook.jpg";
import { Link } from "react-router-dom";

const ItemBook = (props) => {
    const { book } = props;

    return (
        <Card
            component={Link}
            to={`/bookCard/${book.id}`}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none"
            }}
        >
            <CardMedia
                component="img"
                sx={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    objectPosition: 'center'
                }}
                image={book.avatar || imgBook}
                alt={book.title}
            />

            <CardHeader
                title={book.title || "Без названия"}
                subheader={book.author || "Автор не указан"}
            />
        </Card>
    );
};

export default ItemBook;