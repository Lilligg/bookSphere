import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const RightProfile = () => {
    const { user } = useSelector((state) => state.user);

    if (!user) {
        return <Box>Загрузка данных...</Box>;
    }

    return (
        <Box sx={{width: '40%',}}>
            <Box>
            <Typography variant="h5" align={"center"}>
                {user.name}
            </Typography>
            <Box
                component="img"
                src={user.avatar}
                alt="Аватар"
                sx={{
                    width: '50%',
                    margin: '0 auto',
                    display: 'block',
                    height: 'auto',}}
            />
            </Box>
        </Box>
    )
}

export default RightProfile