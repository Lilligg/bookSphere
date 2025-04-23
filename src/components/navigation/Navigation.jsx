import { useState } from 'react';
import {
    AppBar,
    Box, Button,
    Toolbar,
    Typography
} from "@mui/material";
import logo from "./../../assets/assets.png"
import { Link } from "react-router-dom"
import UserMenu from "./UserMenu.jsx";

const Navigation = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogOut = () => {
        setIsLoggedIn(!isLoggedIn);
    }

    const renderAuthButtons = () => (
        <>
            <Link to="/Registration"><Button style={{ color: 'white' }}>Зарегистрироваться</Button></Link>
            <Link to="/Authorization"><Button style={{ color: 'white' }}>Войти</Button></Link>
        </>
    );

    return (
        <AppBar position="static" >
            <Toolbar sx={{ maxWidth: 1200, width: '100%', margin: '0 auto' }}>
                <Box
                    component="img"
                    src={logo}
                    alt="Логотип"
                    sx={{ width: 30, height: 'auto', mr: 2 }}
                />
                <Typography variant="h5">
                    BookSphere
                </Typography>
                <Button onClick={handleLogOut} style={{ color: 'white' }}>Переключение авторизации</Button>
                <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
                    {isLoggedIn ? <UserMenu/> : renderAuthButtons()}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navigation