import { Box } from "@mui/material";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { useState } from "react";

const CustomTabs = (props) => {
    const { data } = props;
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange}>
                    {data.map((tab) => (
                        <Tab
                            key={tab.value}
                            label={tab.label}
                            value={tab.value}
                        />
                    ))}
                </TabList>
            </Box>

            {data.map((tab) => (
                <TabPanel key={tab.value} value={tab.value}>
                    {tab.content}
                </TabPanel>
            ))}
        </TabContext>
    )
}

export default CustomTabs;