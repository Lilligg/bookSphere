import React from "react";
import {Box} from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PersonalInformationTab from "./PersonalInformationTab.jsx";
import LiteraryPreferencesTab from "./LiteraryPreferencesTab.jsx";
import BookListTab from "./BookListTab.jsx";

const LeftProfile = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '60%',}}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Личная информация" value="1" />
                        <Tab label="Литературные предпочтения" value="2" />
                        <Tab label="Книжная полка" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1"><PersonalInformationTab/></TabPanel>
                <TabPanel value="2"><LiteraryPreferencesTab/></TabPanel>
                <TabPanel value="3"><BookListTab/></TabPanel>
            </TabContext>
        </Box>
    )
}

export default LeftProfile