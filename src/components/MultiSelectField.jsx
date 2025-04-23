import { Box, Chip, MenuItem, TextField } from "@mui/material";

const MultiSelect = (props) => {
    const { field, value, onChange } = props;

    return (
        <TextField
            key={field.name}
            select
            SelectProps={{
                multiple: true,
                value: value,
                onChange: onChange,
                renderValue: (selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                            const option = field.options.find(opt => opt.value === value);
                            return (
                                <Chip
                                    key={value}
                                    label={option?.label || value}
                                    size="small"
                                />
                            );
                        })}
                    </Box>
                )
            }}
            label={field.label}
            fullWidth
            margin="normal"
        >
            {field.options.map((option) => (
                <MenuItem
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default MultiSelect;