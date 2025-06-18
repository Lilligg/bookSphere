import MiniBookCard from "./MiniBookCard.jsx";
import {Box, Grid, Stack, Typography} from "@mui/material";

const BooksCollection = (props) => {
    const { books, title } = props;

    return (
        <Box marginTop="25px">
            <Typography
                variant="h3"
                sx={{
                    textAlign: 'center',
                    mb: 4,
                    fontWeight: 700,
                    color: '#5D4037',
                }}
            >
                {title}
            </Typography>
            <Box sx={{
                backgroundColor: '#E6CCB2',
                p: 2,
                boxShadow: 3,
                height: '338px',
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 6
            }}>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        flexWrap: 'nowrap',
                        width: 'auto',
                        maxWidth: '100%',
                    }}
                >
                    {books.map((book) => (
                        <Grid item key={book.id} sx={{
                            minWidth: '220px',
                            maxWidth: '230px',
                            flexShrink: 0,
                        }}>
                            <MiniBookCard book={book} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}

export default BooksCollection;