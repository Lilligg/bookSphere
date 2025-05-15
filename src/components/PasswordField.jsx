import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const PasswordField = (props) => {
    const {
        label,
        value,
        name,
        onChange
    } = props;

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <TextField
            id="outlined-basic"
            type={showPassword ? 'text' : 'password'}
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            variant="outlined"
            sx={{ marginTop: 2 }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default PasswordField;