import { Box } from "@mui/material";
import LeftProfileTab from "../components/userProfile/LeftProfileTab.jsx";
import RightProfile from "../components/userProfile/RightProfile.jsx";

const UserProfile = () => {

    return (
        <Box display="flex">
           <LeftProfileTab/>
           <RightProfile/>
        </Box>
    )
}

export default UserProfile