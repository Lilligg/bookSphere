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
            inputProps={{
                autoComplete: "off",
                ...field.inputProps
            }}
        />
    )
}

export default TextInputField;