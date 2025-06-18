import { Box, Typography } from "@mui/material";
import {
    SentimentSatisfiedAlt,
    Lightbulb,
    ThumbUp,
    ThumbDown,
    Compare,
} from '@mui/icons-material';
import InformationSection from "../../InformationSection.jsx";
import AirIcon from '@mui/icons-material/Air';

const ImpressionsTabs = (props) => {
    const { currentBook } = props;

    return (
        <Box sx={{ padding: "6px" }}>
            <InformationSection
                title="Эмоции"
                content={currentBook.impressions}
                icon={<SentimentSatisfiedAlt fontSize="medium" />}
                variant="h6"
            />

            <InformationSection
                title="Неожиданности"
                content={currentBook.surprises}
                icon={<AirIcon fontSize="medium" />}
                variant="h6"
                marginTop="15px"
            />

            <InformationSection
                title="Советы читателю"
                content={currentBook.tipsForTheReader}
                icon={<Lightbulb fontSize="medium" />}
                variant="h6"
                marginTop="15px"
            />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: "8px", marginBottom: "4px" }}>
                <Compare color="#FFFFFFF" fontSize="medium" />
                <Typography variant="h5">Плюсы и минусы работы</Typography>
            </Box>

            <InformationSection
                title="Плюсы"
                content={currentBook.advantages}
                icon={<ThumbUp fontSize="small" color="success" />}
                variant="h6"
                marginTop="10px"
            />

            <InformationSection
                title="Минусы"
                content={currentBook.disadvantages}
                icon={<ThumbDown fontSize="small" color="error" />}
                variant="h6"
                marginTop="10px"
            />
        </Box>
    )
}

export default ImpressionsTabs;