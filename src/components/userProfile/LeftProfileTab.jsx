import {Box, Divider, Grid, Typography} from "@mui/material";
import CustomTabs from "../CustomTabs.jsx";
import QuoteCard from "../editingBook/QuoteCard.jsx";
import {useSelector} from "react-redux";
import {
    LITERARY_PREFERENCES_TAB_FIELD_GROUP
} from "../../constants/userProfile/LITERARY_PREFERENCES_TAB_FIELD_GROUP.js";
import ProfileInfoItem from "./ProfileInfoIten.jsx";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from '@mui/icons-material/MenuBook';

const LeftProfileTab = () => {
const {user} = useSelector((state) => state.user);

    return (
        <Box sx={{
            width: '100%',
            backgroundColor: '#E6CCB2',
            borderRadius: '10px',
            p: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            mb: 4
        }}>
            {/* Заголовок "О себе" */}
            {user.aboutYourself && (
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            color: '#5C3D2E',
                            marginBottom: "20px",
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <PersonIcon fontSize="medium" />
                        О себе
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#5C3D2E',
                            lineHeight: 1.6,
                            pl: 4,
                        }}
                    >
                        {user.aboutYourself}
                    </Typography>
                </Box>
            )}

            {/* Разделитель */}
            <Divider sx={{
                borderColor: '#B08968',
                opacity: 0.5,
                my: 2
            }} />

            {/* Литературные предпочтения */}
            <Box>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        color: '#5C3D2E',
                        marginBottom: "40px",
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <MenuBookIcon fontSize="medium" />
                    Литературные предпочтения
                </Typography>


                <Grid container spacing={1}>
                    {LITERARY_PREFERENCES_TAB_FIELD_GROUP.map((item) => (
                        <Grid item xs={12} md={6} lg={4} key={item.value}>
                            <ProfileInfoItem item={item} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}

export default LeftProfileTab