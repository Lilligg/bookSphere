import {Box, Divider, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import {arrayToString} from "../../function/arrayToString.js";

const ProfileInfoItem = (props) => {
    const {item} = props;
    const {user} = useSelector((state) => state.user);

    return (
        <Box sx={{ mb: 3 }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 1
            }}>
                <AutoStoriesIcon
                    fontSize="small"
                    sx={{
                        color: '#332418',
                        opacity: 0.8
                    }}
                />
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: 600,
                        color: '#7F5539',
                        letterSpacing: 0.5
                    }}
                >

                    {item.label}
                </Typography>
            </Box>

            <Typography
                variant="body1"
                component="div"
                sx={{
                    pl: 4,
                    mb: 2,
                    color: 'text.secondary',
                    minHeight: 24 // Чтобы сохранить высоту при пустом значении
                }}
            >
                {
                    Array.isArray(user[item.value])
                    ? arrayToString(user[item.value])
                    : user[item.value]
                }
            </Typography>

        </Box>
    )
}

export default ProfileInfoItem