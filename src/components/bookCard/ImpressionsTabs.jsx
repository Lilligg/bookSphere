import { Box, Typography } from "@mui/material";

const ImpressionsTabs = (props) => {
    const { currentBook } = props;

    return (
        <Box>
            <Typography variant="h6" component="div">{currentBook.impressions}</Typography>
        </Box>
    )
}

export default ImpressionsTabs;