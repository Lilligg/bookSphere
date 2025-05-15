import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const PersonageCard = (props) => {
    const { personage } = props;

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: 'auto', width: '100%', margin:"10px"}}>
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
                </CardContent>
            </Card>
        </Grid>
    );
};

export default PersonageCard;