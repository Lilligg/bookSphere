import { Box, Typography } from "@mui/material";

const ImpressionsTabs = (props) => {
    const { currentBook } = props;

    return (
        <Box>
            <Typography variant="h6">Эмоции</Typography>
            <Typography variant="body1">{currentBook.impressions}</Typography>

            <Typography variant="h6">Неожиданности</Typography>
            <Typography variant="body1">{currentBook.surprises}</Typography>

            <Typography variant="h6">Советы читателю</Typography>
            <Typography variant="body1">{currentBook.tipsForTheReader}</Typography>

            <Typography variant="h5" marginTop="15px">Плюсы и минусы работы</Typography>

            <Typography variant="h6">Плюсы</Typography>
            <Typography variant="body1">{currentBook.advantages}</Typography>

            <Typography variant="h6" marginTop="15px">минусы</Typography>
            <Typography variant="body1">{currentBook.disadvantages}</Typography>
        </Box>
    )
}

export default ImpressionsTabs;