import React from 'react';
import { Box, Typography, TextField, MenuItem, Chip } from '@mui/material';

const FieldEditingForm = (
    {
    group,
    formData,
    handleChange,
    handleMultiSelectChange
    }) => {
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
                        <TextField
                            key={field.name}
                            select
                            fullWidth
                            margin="normal"
                            label={field.label}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required={field.required}
                        >
                            {field.options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    );
                }

                if (field.type === "multiselect") {
                    return (
                        <TextField
                            key={field.name}
                            select
                            SelectProps={{
                                multiple: true,
                                value: formData[field.name],
                                onChange: handleMultiSelectChange(field.name),
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
                    );
                }

                return (
                    <TextField
                        key={field.name}
                        fullWidth
                        margin="normal"
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.required}
                        multiline={field.type === "multiline"}
                        rows={field.rows}
                        placeholder={field.placeholder}
                        inputProps={{
                            autoComplete: "off",
                            ...field.inputProps
                        }}
                    />
                );
            })}
        </Box>
    );
};

export default FieldEditingForm;