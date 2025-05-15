import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { useState } from "react";
import {TabList} from "@mui/lab";

const CustomTabs = (props) => {
    const { data } = props;
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>

                <TabList onChange={handleChange}
                         indicatorColor="secondary"
                         textColor="secondary"
                         variant="fullWidth"
                >
                    {data.map((tab) => (
                        <Tab
                            key={tab.value}
                            label={tab.label}
                            value={tab.value}
                        />
                    ))}
                </TabList>

            {data.map((tab) => (
                <TabPanel key={tab.value} value={tab.value} sx = {{ padding: "30px",}} >
                    {tab.content}
                </TabPanel>
            ))}

        </TabContext>
    )
}

export default CustomTabs;