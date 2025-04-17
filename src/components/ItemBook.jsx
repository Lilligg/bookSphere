import React from "react";
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography } from "@mui/material";
import imgBook from "../assets/assets.png";
import { Link } from "react-router-dom";

const ItemBook = ({ book }) => {
    return (
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <CardHeader
                title={book.title || "Без названия"}
                subheader={book.author || "Автор не указан"}
            />
            <CardMedia
                component="img"
                height="200"
                image={book.avatar || imgBook}
                alt={book.title}
                sx={{ objectFit: "contain", p: 1 }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                    Год: {book.yearPublication || "не указан"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Жанр: {book.genre?.join(", ") || "не указан"}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    component={Link}
                    to={`/bookCard/${book.id}`}
                >
                    Подробнее
                </Button>
            </CardActions>
        </Card>
    );
};

export default ItemBook;