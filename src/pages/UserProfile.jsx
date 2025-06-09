import { Box } from "@mui/material";
import InformationUser from "../components/userProfile/InformationUser.jsx";
import PersonalInformation from "../components/userProfile/PersonalInformation.jsx";

const UserProfile = () => {

    return (
        <Box display="flex" flexDirection= "column">
            <PersonalInformation/>
            <InformationUser/>
        </Box>
    )
}

export default UserProfile