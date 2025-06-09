import { Box, Typography } from "@mui/material";

const AboutTabs = (props) => {
    const { currentBook } = props;

    return (
        <Box>
            <Typography variant="h5">Сюжет</Typography>
            <Typography variant="body1">{currentBook.about}</Typography>

            <Typography variant="h5" marginTop="15px">Об авторе</Typography>
            <Typography variant="body1">{currentBook.aboutAuthor}</Typography>

            <Typography variant="h5" marginTop="15px">Для кого эта книга</Typography>

            <Typography variant="h6">Идеальный читатель</Typography>
            <Typography variant="body1">{currentBook.perfectReader}</Typography>

            <Typography variant="h6" marginTop="15px">Кому не подойдет</Typography>
            <Typography variant="body1">{currentBook.whoDoesNotLove}</Typography>
        </Box>
    )
}

export default AboutTabs;