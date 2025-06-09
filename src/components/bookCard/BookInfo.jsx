import { Avatar, Box, IconButton, Typography, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { arrayToString } from "../../function/arrayToString.js";
import EditIcon from '@mui/icons-material/Edit';
import imgBook from "../../assets/noBook.jpg";

const BookInfo = (props) => {
    const { currentBook } = props;

    return(
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            position="relative"
        >
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
            >
                <Avatar
                    src={currentBook.avatar || imgBook}
                    sx={{
                        width: '210px',
                        height: '210px',
                        border: '5px solid',
                        borderColor: '#EDE0D4'
                    }}
                />
            </Box>

            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                marginLeft="40px"
            >
                <Box marginBottom="40px" paddingRight="100px">
                    <Typography
                        variant="h2"
                        color="#EDE0D4"
                        sx={{
                            fontWeight: 700,
                        }}
                    >
                        {currentBook.title}
                    </Typography>
                </Box>

                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    <Box>
                        <Typography variant="h4" color="#EDE0D4">
                            {currentBook.author + ", " + currentBook.yearPublication + "г."}
                        </Typography>
                        <Typography variant="h6" color="#EDE0D4">
                            {arrayToString(currentBook.genre)}
                        </Typography>
                    </Box>

                    {currentBook.overallRating > 0 && (
                        <Box>
                            <Typography variant="h6" color="#EDE0D4">
                                Общий рейтинг
                            </Typography>

                            <Box
                                display="flex"
                                flexDirection="row"
                            >
                                <Rating
                                    name="overall-score"
                                    value={currentBook.overallRating}
                                    precision={0.1}
                                    readOnly
                                    sx={{
                                        '& .MuiRating-icon': {
                                            color: "#debf76", // цвет заполненных звезд
                                        },
                                        '& .MuiRating-iconEmpty': {
                                            color: '#d8d8d8', // цвет пустых звезд
                                        }
                                    }}
                                />

                                <Typography
                                    variant="body1"
                                    color="#EDE0D4"
                                    sx={{
                                        marginLeft:'5px',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {currentBook.overallRating.toFixed(1)} / 5
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>

            <Box position="absolute" top="0px" right="0px">
                <IconButton
                    component={Link}
                    to={`/EditingBooks/${currentBook.id}`}
                    sx={{color: "#EDE0D4"}}
                >
                    <EditIcon/>
                </IconButton>
            </Box>
        </Box>
    )
}

export default BookInfo;