import { Box } from "@mui/material";
import InformPanel from "../InformPanel.jsx";
import { useSelector } from "react-redux";
import {
    LITERARY_PREFERENCES_TAB_FIELD_GROUP
} from "../../constants/userProfile/LITERARY_PREFERENCES_TAB_FIELD_GROUP.js";

const LiteraryPreferencesTab = () => {
    const { user } = useSelector((state) => state.user);

    if (!user) {
        return <Box>Загрузка данных...</Box>;
    }

    const literaryPreferences = LITERARY_PREFERENCES_TAB_FIELD_GROUP(user)

    return (
        <Box>
            <InformPanel data={literaryPreferences} />
        </Box>
    )
}

export default LiteraryPreferencesTab;