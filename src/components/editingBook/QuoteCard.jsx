import { Card, CardContent, Typography, Box, Grid } from '@mui/material';

const QuoteCard = (props) => {
    const {quotes} = props;

    return (
        <Box>
            <Card sx={{ height: 'auto', width: '100%', margin:"10px"}}>
                <CardContent>
                    <Typography variant="body1">{quotes.text}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {quotes.person}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default QuoteCard;