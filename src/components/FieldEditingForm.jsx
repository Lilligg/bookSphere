import { Box, Typography } from '@mui/material';
import SelectField from "./SelectField.jsx";
import MultiSelect from "./MultiSelectField.jsx";
import TextInputField from "./TextInputField.jsx";

const FieldEditingForm = (props) => {
    const  { group, formData, handleChange, handleMultiSelectChange } = props;

    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    mb: 2,
                    color: 'text.secondary',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                {group.title}
            </Typography>

            {group.fields.map((field) => {

                if (field.type === "select") {
                    return (
                       <SelectField field={field} key={field.name} onChange={handleChange} value={formData[field.name]} />
                    );
                }

                if (field.type === "multiselect") {
                    return (
                        <MultiSelect field={field} onChange={handleMultiSelectChange} value={formData[field.name]}/>
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