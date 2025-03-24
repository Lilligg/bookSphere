import {Box, Typography} from "@mui/material";
import logo from "../../assets/assets.png";
import React from "react";

const RightProfile = () => {
    return (
        <Box sx={{width: '40%',}}>
            <Box sx={{
                width: 'auto',
                borderRadius: 2,
                boxShadow: 3,}}>
            <Typography variant="h5" align={"center"}>Lilligg</Typography>
            <Box
                component="img"
                src={logo}
                alt="Аватар"
                sx={{ width: '50%', margin: '0 auto', display: 'block', height: 'auto'}}
            />
            </Box>
        </Box>
    )
}

export default RightProfile