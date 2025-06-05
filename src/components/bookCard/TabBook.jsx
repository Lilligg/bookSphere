import { BOOK_TABS } from "../../constants/bookCard/BOOK_TABS.jsx";
import CustomTabs from "../CustomTabs.jsx";
import { Box, Typography } from "@mui/material";

const TabBook = (props) => {
    const { currentBook } = props;

    return (
        <Box
            display="flex"
            flexDirection="row"
        >
            <Box>
                <CustomTabs data = {BOOK_TABS(currentBook) }/>
            </Box>
        </Box>
    )
}

export default TabBook;