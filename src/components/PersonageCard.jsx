import { Card, CardContent, CardMedia, Typography, Button, Box, IconButton, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { removePersonage } from '../redux/book/bookSlice';

const PersonageCard = (props) => {
    const { personage, bookId } = props;
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(removePersonage({ bookId, personageId: personage.id }));
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card>
                {personage.avatar && (
                    <CardMedia
                        component="img"
                        height="200"
                        image={personage.avatar}
                        alt={personage.name}
                    />
                )}
                <CardContent>
                    <Typography variant="h6">{personage.name}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {personage.characterStatus}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                        {personage.description}
                    </Typography>
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <IconButton aria-label="edit" size="small">
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="delete" size="small" onClick={handleDelete}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default PersonageCard;