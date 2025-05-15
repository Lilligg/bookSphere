import { Box, Typography } from "@mui/material";
import { Rating } from "@mui/lab";
import { RATING_TABS } from "../../constants/bookCard/RATING_TABS.js";

const Ratings = (props) => {
    const {formData, setFormData} = props;

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
        <>
            <Typography>Оценка книги</Typography>
            {RATING_TABS.map((tab) => (
                <Box key={tab.name}>
                    <Typography>{tab.label}</Typography>
                    <Rating
                        name={tab.name}
                        value={formData.rating[tab.name] || 0}
                        precision={0.5}
                        onChange={(e, newValue) => handleChange(tab.name, newValue)}
                    />
                </Box>
            ))}
        </>
    );
};

export default Ratings;