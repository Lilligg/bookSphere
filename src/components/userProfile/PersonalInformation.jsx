import {Avatar, Box, Typography} from "@mui/material";
import { useSelector } from "react-redux";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import PersonIcon from "@mui/icons-material/Person";
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {formatBirthday} from "../../function/formatBirthday.js";

const PersonalInformation = () => {
    const { user } = useSelector((state) => state.user);

    if (!user) {
        return <Box>Загрузка данных...</Box>;
    }

    return (
        <Box sx={{ width: '100%', marginBottom: "30px" }}>
            <Box display="flex" flexDirection="row" gap={4}>
                <Avatar
                    src={user.avatar}
                    sx={{
                        width: 250,
                        height: 250,
                        border: '2px solid',
                        borderColor: 'white',
                    }}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
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

                        {(user.city || user.dateOfBirth) && (
                            <Box display="flex" gap={3} alignItems="center" mb={2}>
                                {user.city && (
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <LocationOnIcon fontSize="small" />
                                        <Typography variant="body1">{user.city}</Typography>
                                    </Box>
                                )}

                                {user.dateOfBirth && (
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <CakeIcon fontSize="small" />
                                        <Typography variant="body1">{formatBirthday(user.dateOfBirth)}</Typography>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Box>

                    {user.loveQuote && (
                        <Box sx={{ p: 2 }}>
                            <Typography variant="h6" color='text.primary'>
                                <FormatQuoteIcon sx={{ transform: 'rotate(180deg)', mr: 1 }} />
                                {user.loveQuote}
                            </Typography>

                            {user.authorLoveQuote && (
                                <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
                                    <PersonIcon fontSize="small" />
                                    <Typography variant="subtitle1" color='text.secondary'>
                                        {user.authorLoveQuote}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default PersonalInformation