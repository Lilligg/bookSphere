import {Box, Typography} from "@mui/material";

const Quote = ({ data }) => {
    return (
        <Box>
            {data.map((quote, author, index) => (
                <Box key={index}>
                    <Typography variant="body1" component="p">{quote}</Typography>
                    <Typography variant="body2" component="p">Автор: {author}</Typography>
                </Box>
            ))}
        </Box>
    )
}
export default Quote