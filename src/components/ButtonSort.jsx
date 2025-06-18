import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSortConfig } from "../redux/book/bookSlice.js";

const ButtonSort = (props) => {
    const { configuration } = props;
    const dispatch = useDispatch();

    const { sortConfig } = useSelector((state) => state.book);

    const handleSort = (key) => {
        if (sortConfig?.key === key) {
            const newDirection = sortConfig.direction === 'asc' ? 'desc' : 'asc';
            dispatch(setSortConfig({ key, direction: newDirection }));
        } else {
            dispatch(setSortConfig({ key, direction: 'asc' }));
        }
    };

    const getSortIcon = (key) => {
        if (sortConfig?.key !== key) return null;
        return sortConfig.direction === 'asc' ? '↑' : '↓';
    };

    return (
        <Box>
            {configuration.map((configuration, i) => (
                <Box mb={3} key={i}>
                    <Typography variant="subtitle1" gutterBottom>
                        {configuration.title}:
                    </Typography>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            color: "#E6CCB2",
                            borderColor: "#7F5539",
                            backgroundColor: sortConfig?.key === configuration.sortKey ? '#7F5539' : '#B08968',
                            fontWeight: 600
                        }}
                        onClick={() => handleSort(configuration.sortKey)}
                        endIcon={getSortIcon(configuration.sortKey)}
                    >
                        {sortConfig?.key === configuration.sortKey ?
                            (sortConfig.direction === 'asc' ? configuration.ascText : configuration.descText) :
                            configuration.defaultText}
                    </Button>
                </Box>
            ))}
        </Box>
    )
}

export default ButtonSort;