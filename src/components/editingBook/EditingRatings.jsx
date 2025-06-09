import { Box, Typography } from "@mui/material";
import { Rating } from "@mui/lab";
import { RATING_TABS } from "../../constants/bookCard/RATING_TABS.js";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const EditingRatings = (props) => {
    const { formData, setFormData } = props;

    const handleChange = (name, value) => {
        const updatedRating = {
            ...formData.rating,
            [name]: value
        };

        const newOverallRating = calculateAverage(updatedRating);

        setFormData(prev => ({
            ...prev,
            rating: updatedRating,
            overallRating: newOverallRating
        }));
    };

    const calculateAverage = (ratingObj) => {
        const ratingsArray = Object.values(ratingObj)
            .map(value => parseFloat(value || 0));
        const sum = ratingsArray.reduce((acc, val) => acc + val, 0);
        return ratingsArray.length ? sum / ratingsArray.length : 0;
    };

    return (
        <Box>
            <Typography
                variant="h6"
                sx={{
                    mb: 2,
                    color: 'text.secondary',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <KeyboardDoubleArrowLeftIcon/>Оценка книги<KeyboardDoubleArrowRightIcon/>
            </Typography>

            {RATING_TABS.map((tab) => (
                <Box key={tab.name}>
                    <Box margin="10px">
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                        >
                            {tab.label}:
                        </Typography>
                        <Rating
                            name={tab.name}
                            value={formData.rating[tab.name] || 0}
                            precision={0.5}
                            onChange={(e, newValue) => handleChange(tab.name, newValue)}
                            size="medium"
                        />
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default EditingRatings;