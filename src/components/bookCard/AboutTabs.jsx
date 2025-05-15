import { Box, Typography } from "@mui/material";

const AboutTabs = (props) => {
    const { currentBook } = props;

    return (
        <Box>
            <Typography variant="h6">Основная информация о книге</Typography>
            <Typography variant="body1">{currentBook.about}</Typography>
        </Box>
    )
}

export default AboutTabs;