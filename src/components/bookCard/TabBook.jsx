import { BOOK_TABS } from "../../constants/bookCard/BOOK_TABS.jsx";
import CustomTabs from "../CustomTabs.jsx";
import { Box, Typography } from "@mui/material";

const TabBook = (props) => {
    const { currentBook } = props;

    return (
        <Box
            marginTop = "30px"
            display="flex"
            flexDirection="row"
        >
            <Box width="60%">
                <CustomTabs data = {BOOK_TABS(currentBook) }/>
            </Box>
            <Box width="40%" marginTop="20px">
                <Typography variant="body1" align="center">
                    Тут будет статистика по книге
                </Typography>
            </Box>
        </Box>
    )
}

export default TabBook;