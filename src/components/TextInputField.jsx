import { TextField } from "@mui/material";

const TextInputField = (props) => {
    const { field, value, onChange } = props;

    return (
        <TextField
            key={field.name}
            fullWidth
            margin="normal"
            label={field.label}
            name={field.name}
            type={field.type}
            value={value}
            onChange={onChange}
            required={field.required}
            multiline={field.type === "multiline"}
            rows={field.rows}
            placeholder={field.placeholder}
            InputLabelProps={{
                shrink: true,
            }}
            inputProps={{
                autoComplete: "off",
                ...field.inputProps
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#553924',
                    },
                    '&:hover fieldset': {
                        borderColor: '#553924',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#7F5539',
                    },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: '#7F5539',
                },
            }}
        />
    )
}

export default TextInputField;