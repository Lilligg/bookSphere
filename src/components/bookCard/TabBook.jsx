import {Box} from "@mui/material";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import PersonalInformationTab from "../userProfile/PersonalInformationTab.jsx";
import TabContext from "@mui/lab/TabContext";
import React from "react";

const TabBook = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="О книге" value="1" />
                    <Tab label="Персонажи" value="2" />
                    <Tab label="Цитаты" value="3" />
                    <Tab label="Впечатления" value="4" />
                    <Tab label="Оценка" value="5" />
                </TabList>
            </Box>
            <TabPanel value="1">аааа</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
            <TabPanel value="4">ддд</TabPanel>
            <TabPanel value="5">Item Two</TabPanel>
        </TabContext>
    )
}

export default TabBook;