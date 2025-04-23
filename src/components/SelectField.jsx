import { MenuItem, TextField } from "@mui/material";

const SelectField = (props) => {
    const { field, value, onChange } = props;

    return (
        <TextField
            key={field.name}
            select
            fullWidth
            margin="normal"
            label={field.label}
            name={field.name}
            value={value}
            onChange={onChange}
            required={field.required}
        >
            {field.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default SelectField;