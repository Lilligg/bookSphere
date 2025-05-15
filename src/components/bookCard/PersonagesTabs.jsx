import { Box } from "@mui/material";
import PersonageCard from "../editingBook/PersonageCard.jsx";

const PersonagesTabs = (props) => {
    const { currentBook } = props;

    return (
        <Box>
            {currentBook.personages.map((personage, index) => (
                <PersonageCard personage = {personage} key = {index}/>
            ))}
        </Box>
    )
}

export default PersonagesTabs;