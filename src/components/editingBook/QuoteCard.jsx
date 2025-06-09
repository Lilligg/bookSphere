import { Typography, Box, Divider } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import PersonIcon from '@mui/icons-material/Person';

const QuoteCard = (props) => {
    const { quotes } = props;

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
                marginTop: "20px"
            }}
        >
            <Typography
                variant="h6"
                color= 'text.primary'
            >
               <FormatQuoteIcon/> {quotes.text}
            </Typography>

            <Box textAlign= 'right' display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
                <PersonIcon fontSize="medium"/>
                <Typography
                    variant="h6"
                    sx={{
                        textAlign: 'right',
                        color: 'text.secondary',
                    }}>
                    {quotes.person}
                </Typography>
            </Box>

            <Divider sx={{ marginTop: '15px' }}/>
        </Box>
    );
};

export default QuoteCard;