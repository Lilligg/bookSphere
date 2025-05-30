import { Box } from "@mui/material";
import LeftProfileTab from "../components/userProfile/LeftProfileTab.jsx";
import RightProfile from "../components/userProfile/RightProfile.jsx";

const UserProfile = () => {

    return (
        <Box display="flex" flexDirection= "column">
            <RightProfile/>
            <LeftProfileTab/>
        </Box>
    )
}

export default UserProfile