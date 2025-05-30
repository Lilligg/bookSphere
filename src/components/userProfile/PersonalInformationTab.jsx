import { Box } from "@mui/material";
import InformPanel from "../InformPanel.jsx";
import { useSelector } from "react-redux";
import { PERSONAL_INFORMATION_TAB_FIELD_GROUP } from "../../constants/userProfile/PERSONAL_INFORMATION_TAB_FIELD_GROUP.js";

const PersonalInformationTab = () => {
    const { user } = useSelector((state) => state.user);

    if (!user) {
        return <Box>Загрузка данных...</Box>;
    }

    return (
        <Box>
            <InformPanel data={PERSONAL_INFORMATION_TAB_FIELD_GROUP} user={user} />
        </Box>
    );
}

export default PersonalInformationTab