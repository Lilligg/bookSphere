import { Box, Typography } from "@mui/material";
import { RATING_TABS } from "../../constants/bookCard/RATING_TABS.js";
import { Rating } from "@mui/lab";

const RatingTabs = (props) => {
    const { currentBook } = props;

    return (
        <Box>
            {RATING_TABS.map((tab, index) => (
                <Box key={index}>
                    <Typography variant="h6">
                        {tab.label}
                    </Typography>
                    <Box px={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "10px",
                        marginLeft: "0px",
                    }}>
                        <Rating
                            name={tab.name}
                            defaultValue={0}
                            precision={0.5}
                            value={currentBook.rating[tab.name]}
                            readOnly
                        />
                        <Typography px={{
                            marginLeft: "10px",
                        }}>
                            {currentBook.rating[tab.name]} / 5
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default RatingTabs