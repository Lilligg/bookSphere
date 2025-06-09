import {Avatar, Box, Typography} from "@mui/material";
import { useSelector } from "react-redux";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import PersonIcon from "@mui/icons-material/Person";
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {formatBirthday} from "../../function/formatBirthday.js";

const RightProfile = () => {
    const { user } = useSelector((state) => state.user);

    if (!user) {
        return <Box>Загрузка данных...</Box>;
    }

    return (
        <Box sx={{ width: '100%', marginBottom: "30px" }}>
            <Box display="flex" flexDirection="row" gap={4}>
                {/* Аватар */}
                <Avatar
                    src={user.avatar}
                    sx={{
                        width: 250,
                        height: 250,
                        border: '2px solid',
                        borderColor: 'white',
                    }}
                />

                {/* Основная информация */}
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    {/* Имя и основная информация */}
                    <Box>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 700,
                                color: "#5C3D2E",
                                mb: 1
                            }}
                        >
                            {user.name}
                        </Typography>

                        {/* Город и год рождения */}
                        <Box display="flex" gap={3} alignItems="center" mb={2}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <LocationOnIcon fontSize="small" />
                                <Typography variant="body1">{user.city}</Typography>
                            </Box>

                            <Box display="flex" alignItems="center" gap={1}>
                                <CakeIcon fontSize="small" />
                                <Typography variant="body1">{formatBirthday(user.dateOfBirth)}</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Цитата */}
                    <Box sx={{
                        p: 2,
                    }}>
                        <Typography variant="h6" color='text.primary'>
                            <FormatQuoteIcon sx={{ transform: 'rotate(180deg)', mr: 1 }} />
                            {user.loveQuote}
                        </Typography>

                        <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
                            <PersonIcon fontSize="small" />
                            <Typography variant="subtitle1" color='text.secondary'>
                                {user.authorLoveQuote}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
            )
}

export default RightProfile