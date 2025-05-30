import { Box, Button, TextField, Typography } from "@mui/material";
import PasswordField from "../components/PasswordField.jsx";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { registration } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Registration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: "",
        name: null,
        password: null,
        confirmPassword: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (user.name == null) {
            alert("Пожалуйста, заполните имя!");
        }
        else if (user.password == null) {
            alert("Пожалуйста, заполните пароль!");
        }
        else if (user.password !== user.confirmPassword) {
            alert("Пароли не совпадают");
        }
        else {
            alert("Регистрация прошла успешно")
            const newUser = {
                id: uuidv4(),
                name: user.name,
                password: user.password,
            }
            dispatch(registration(newUser));
            navigate("/EditingProfile");
        }
    };

    return (
        <Box
            backgroundColor='#F8F4E3'
            padding="25px"
            sx={{
                marginTop: 5
            }}
        >
            <Typography variant="h5" align={"center"}>
                Зарегистрируйтесь в системе, чтобы получить доступ к сайту
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                sx={{
                    maxWidth: '50%',
                    margin: '0 auto'
                }}
            >
                <TextField
                    name="name"
                    id="outlined-basic"
                    label="Имя пользователя"
                    variant="outlined"
                    value={user.name}
                    onChange={handleChange}
                    sx={{marginTop: 2}}
                />
                <PasswordField
                    name="password"
                    value={user.password}
                    label={"Пароль"}
                    onChange={handleChange}
                />
                <PasswordField
                    name="confirmPassword"
                    value={user.confirmPassword}
                    label={"Повторите пароль"}
                    onChange={handleChange}
                />
                <Button
                    variant="outlined"
                    color="primary"
                    sx={{marginTop: 2}}
                    onClick={handleSubmit}
                >
                    Зарегистрироваться
                </Button>
            </Box>
        </Box>
    )
}

export default Registration