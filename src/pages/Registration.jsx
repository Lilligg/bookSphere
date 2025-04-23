import { Box, Button, TextField, Typography } from "@mui/material";
import PasswordField from "../components/PasswordField.jsx";

const Registration = () => {

    return (
        <Box sx = {{marginTop: 5}}>
            <Typography variant="h5" align={"center"}>Зарегистрируйтесь в системе, чтобы получить доступ к сайту</Typography>
            <Box display="flex" flexDirection="column" sx={{ maxWidth: '50%', margin: '0 auto'}}>
                <TextField id="outlined-basic" label="Имя пользователя" variant="outlined" sx = {{marginTop: 2}}/>
                <PasswordField label={"Пароль"}></PasswordField>
                <PasswordField label={"Повторите пароль"}></PasswordField>
                <Button variant="outlined" color="primary" sx = {{marginTop: 2}}>Зарегистрироваться</Button>
            </Box>
        </Box>
    )
}

export default Registration