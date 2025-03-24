import React from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import PasswordField from "../components/PasswordField.jsx";

const Authorization = () => {

    return (
        <Box sx = {{marginTop: 5}}>
            <Typography variant="h5" align={"center"}>Войдите в систему, чтобы получить доступ к вашему профилю</Typography>
            <Box display="flex" flexDirection="column" sx={{ maxWidth: '50%', margin: '0 auto'}}>
                <TextField id="outlined-basic" label="Имя пользователя" variant="outlined" sx = {{marginTop: 2}}/>
                <PasswordField label={"Пароль"}></PasswordField>

                <Button variant="outlined" color="primary" sx = {{marginTop: 2}}>Войти</Button>
                <Button variant="outlined" color="primary" sx = {{marginTop: 2}}>Забыли пароль?</Button>
            </Box>
        </Box>
    )
}

export default Authorization