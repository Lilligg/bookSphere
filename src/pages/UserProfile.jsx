import React from "react";
import {Box} from "@mui/material";
import LeftProfile from "../components/userProfile/LeftProfile.jsx";
import RightProfile from "../components/userProfile/RightProfile.jsx";

const UserProfile = () => {

    return (
        <Box display="flex">
           <LeftProfile/>
           <RightProfile/>
        </Box>
    )
}

export default UserProfile