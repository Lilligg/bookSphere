import {Avatar, Box, Typography} from "@mui/material";
import { useSelector } from "react-redux";

const RightProfile = () => {
    const { user } = useSelector((state) => state.user);

    if (!user) {
        return <Box>Загрузка данных...</Box>;
    }

    return (
        <Box sx={{width: '40%', marginBottom: "20px"}}>
            <Box display="flex" flexDirection="row">
            <Avatar
                    src={user.avatar}
                    sx={{
                        width: 200,
                        height: 200,
                        border: '2px solid',
                        borderColor: 'white'
                    }}
            />

            <Typography variant="h5" color= "white" display="flex" alignItems = "center" marginLeft="30px">
                {user.name}
            </Typography>

            </Box>
        </Box>
    )
}

export default RightProfile