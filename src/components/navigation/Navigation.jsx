import {
    AppBar,
    Box, Button,
    Toolbar,
    Typography
} from "@mui/material";
import logo from "./../../assets/logo.png"
import { Link } from "react-router-dom"
import UserMenu from "./UserMenu.jsx";
import {useSelector} from "react-redux";

const Navigation = () => {
    const { isAuth  } = useSelector((state) => state.user);

    const renderAuthButtons = () => (
        <>
            <Link to="/Registration"><Button style={{ color: 'white' }}>Зарегистрироваться</Button></Link>
            <Link to="/Authorization"><Button style={{ color: 'white' }}>Войти</Button></Link>
        </>
    );

    return (
        <AppBar position="static" sx={{ backgroundColor: '#262526' }}>
            <Toolbar sx={{
                maxWidth: 1200,
                width: '100%',
                margin: '0 auto'
            }}>
                <Box
                    component="img"
                    src={logo}
                    alt="Логотип"
                    sx={{ width: 30, height: 'auto', mr: 2 }}
                />
                <Typography variant="h5">
                    BookSphere
                </Typography>

                <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
                    {isAuth ? <UserMenu/> : renderAuthButtons()}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navigation