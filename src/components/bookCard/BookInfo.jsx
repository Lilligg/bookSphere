import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { Rating } from "@mui/lab";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import imgBook from "../../assets/noBook.jpg";

const BookInfo = (props) => {
    const { currentBook } = props;

    return(
        <Box display="flex"
             flexDirection="row"
             alignItems = "stretch"
             justifyContent = "flex-start"
             margin="10px"
             position = "relative"
        >
            <Box
                display= "flex"
                flexDirection= "column"
                justifyContent= "center"
            >
                <Avatar
                    src={currentBook.avatar || imgBook}
                    sx={{
                        width: 200,
                        height: 200,
                        border: '3px solid',
                        borderColor: 'white'
                    }}
                />
            </Box>

            <Box marginLeft = "40px" marginRight = "30px">
                <Typography variant="h2" color="white" marginBottom = "20px">{currentBook.title}</Typography>
                <Typography variant="h4" color="white">{currentBook.author + ", " + currentBook.yearPublication + "г."}</Typography>
                <Typography variant="body1" color="white">{currentBook.genre}</Typography>
            </Box>

            <Box position = "absolute" top="0px" right="0px">
                <IconButton
                    component={Link}
                    to={`/EditingBooks/${currentBook.id}`}
                    sx={{color: 'white'}}
                >
                    <EditIcon/>
                </IconButton>
            </Box>

            <Box position = "absolute" bottom="0px"  right="0px">
                <Typography color="white">Общий рейтинг</Typography>
                <Box display="flex" flexDirection="row" >
                    <Rating
                        name="overall-score"
                        defaultValue={currentBook.overallRating}
                        precision={0.1}
                        readOnly
                        aria-orientation="vertical"
                        sx={{
                            '& .MuiRating-icon': {
                                color: '#debf76', // цвет заполненных звезд
                            },
                            '& .MuiRating-iconEmpty': {
                                color: '#d8d8d8', // цвет пустых звезд
                            }
                        }}
                    />
                    <Typography
                        color="white"
                        sx={{
                            marginLeft:"5px",
                            whiteSpace: "nowrap"
                        }}
                    >
                        {currentBook.overallRating.toFixed(1)} / 5
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default BookInfo;