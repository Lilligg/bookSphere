import { Box, Typography } from '@mui/material';
import SelectField from "./SelectField.jsx";
import MultiSelect from "./MultiSelectField.jsx";
import TextInputField from "./TextInputField.jsx";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const FieldEditingForm = (props) => {
    const  {
        group,
        formData,
        handleChange,
        handleMultiSelectChange
    } = props;

    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    mb: 2,
                    color: 'text.secondary',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <KeyboardDoubleArrowLeftIcon/>{group.title}<KeyboardDoubleArrowRightIcon/>
            </Typography>

            {group.fields.map((field) => {
                if (field.type === "select") {
                    return (
                       <SelectField field={field} key={field.name} onChange={handleChange} value={formData[field.name]} />
                    );
                }

                if (field.type === "multiselect") {
                    return (
                        <MultiSelect field={field} onChange={handleMultiSelectChange} value={formData[field.name]|| []}/>
                    );
                }

                return (
                    <TextInputField field={field} onChange={handleChange} value={formData[field.name]} />
                );
            })}
        </Box>
    );
};

export default FieldEditingForm;