import { Box, Typography } from '@mui/material';
import malePersonage from "../../assets/malePersonage.png";
import womanPersonage from "../../assets/womanPersonage.png";

const PersonageCard = ({ personage = {}, onClick }) => {
    const {
        name = 'Неизвестный персонаж',
        gender = '',
        avatar = null,
        characterStatus = 'Статус не указан'
    } = personage;

    return (
        <Box
            onClick={onClick}
            sx={{
                display: 'flex',
                height: '100%',
                cursor: 'pointer',
                borderRadius: 1,
                overflow: 'hidden',
                boxShadow: 1,
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                }
            }}
        >
            <Box
                component="img"
                src={avatar || (gender === "male" ? malePersonage : womanPersonage)}
                alt={name}
                sx={{
                    width: 120,
                    height: 120,
                    objectFit: 'cover',
                    flexShrink: 0
                }}
            />
            <Box sx={{ p: 2, flexGrow: 1 }}>
                <Box display="flex" alignItems="center" flexDirection="row">
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {name}
                    </Typography>
                    <Typography
                            sx={{
                                ml: 1,
                                color: gender === "male" ? 'primary.main' : 'secondary.main'
                            }}
                        >
                            {gender === "male" ? '♂' : '♀'}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {characterStatus}
                </Typography>
            </Box>
        </Box>
    );
};

export default PersonageCard;