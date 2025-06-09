import { useState } from "react";
import { TabList } from "@mui/lab";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

const CustomTabs = (props) => {
    const { data } = props;
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value} >
            <TabList
                onChange={handleChange}
                textColor="#7F5539"
                variant="fullWidth"
                sx={{
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#7F5539',
                        height: '3px',
                    }
                }}
            >
                {data.map((tab) => (
                    <Tab
                        key={tab.value}
                        label={tab.label}
                        value={tab.value}
                        textColor="#7F5539"
                        sx={{
                            fontSize: '20px',
                            fontWeight: 700,
                            textTransform: 'none', //Не дает буквы сделать большими
                            color: '#7F5539',
                        }}
                    />
                ))}
            </TabList>

            {data.map((tab) => (
                <TabPanel
                    key={tab.value}
                    value={tab.value}
                    sx={{ padding: '30px' }}
                >
                    {tab.content}
                </TabPanel>
            ))}
        </TabContext>
    )
}

export default CustomTabs;