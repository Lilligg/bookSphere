import { Box, Typography } from "@mui/material";
import InformationSection from "../../InformationSection.jsx";
import {
    MenuBook,
    Person,
    Group,
    Mood,
    MoodBad
} from '@mui/icons-material';

const AboutTabs = (props) => {
    const { currentBook } = props;

    return (
        <Box sx={{ padding: "6px" }}>
            <InformationSection
                title="Сюжет"
                content={currentBook.about}
                icon={<MenuBook fontSize="medium" />}
            />

            <InformationSection
                title="Об авторе"
                content={currentBook.aboutAuthor}
                marginTop="15px"
                icon={<Person fontSize="medium" />}
            />

            <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Group fontSize="medium" /> Для кого эта книга
            </Typography>

            <InformationSection
                title="Идеальный читатель"
                content={currentBook.perfectReader}
                variant="h6"
                icon={<Mood fontSize="small" />}
            />

            <InformationSection
                title="Кому не подойдет"
                content={currentBook.whoDoesNotLove}
                variant="h6"
                marginTop="10px"
                icon={<MoodBad fontSize="small" />}
            />
        </Box>
    )
}

export default AboutTabs;