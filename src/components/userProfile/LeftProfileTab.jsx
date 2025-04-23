import { Box } from "@mui/material";
import CustomTabs from "../CustomTabs.jsx";
import { LEFT_PROFILE_TABS } from "../../constants/userProfile/LEFT_PROFILE_TABS.jsx";

const LeftProfileTab = () => {

    return (
        <Box sx={{ width: '60%',}}>
           <CustomTabs data={LEFT_PROFILE_TABS} />
        </Box>
    )
}

export default LeftProfileTab