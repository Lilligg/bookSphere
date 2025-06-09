import {Box, Typography, Rating} from "@mui/material";
import { RATING_TABS } from "../../../constants/bookCard/RATING_TABS.js";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

const RatingTabs = (props) => {
    const { currentBook } = props;

    return (
        <Box>
            {RATING_TABS.map((tab, index) => (
                <Box key={`ratingTabs${index}`} margin="10px" >
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <Typography variant="h5">
                            {tab.label}:
                        </Typography>

                        <Box px={{
                            display: "flex",
                            flexDirection: "row",
                            margin: "10px",
                            marginLeft: "15px",
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
                    <Box marginLeft="30px">
                        <Typography variant="h6">
                            <EditCalendarIcon/> За что отвечает:
                        </Typography>
                        {tab.text.map((text, index) => (
                            <Typography variant="body1" key={`text${index}`}>
                               {text}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default RatingTabs