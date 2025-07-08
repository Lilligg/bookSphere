import {
    AppBar,
    Box, Button, Stack,
    Toolbar,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import logo from "./../../assets/logo.png"
import { Link } from "react-router-dom"
import UserMenu from "./UserMenu.jsx";
import {useSelector} from "react-redux";

const Navigation = () => {
    const { isAuth } = useSelector((state) => state.user);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const renderAuthButtons = () => (
        <>
            <Link to="/Registration">
                <Button
                    style={{ color: 'white' }}
                    size={isMobile ? "small" : "medium"}
                >
                    {isMobile ? "Регистрация" : "Зарегистрироваться"}
                </Button>
            </Link>
            <Link to="/Authorization">
                <Button
                    style={{ color: 'white' }}
                    size={isMobile ? "small" : "medium"}
                >
                    Вход
                </Button>
            </Link>
        </>
    );

    return (
        <AppBar position="static" sx={{ backgroundColor: '#7F5539' }}>
            <Toolbar sx={{
                maxWidth: 1200,
                width: '100%',
                margin: '0 auto',
                padding: { xs: '0 8px', sm: '0 8px' }
            }}>
                <Box
                    component="img"
                    src={logo}
                    alt="Логотип"
                    sx={{
                        width: 40,
                        height: 'auto',
                        mr: 1,
                        display: 'block'
                    }}
                />

                <Typography
                    variant="h5"
                    sx={{
                        fontSize: { xs: '1.2rem', sm: '1.5rem' },
                        mr: { xs: 1, sm: 0 }
                    }}
                >
                    BookSphere
                </Typography>

                {!isMobile && (
                    <Stack direction="row" spacing={3} marginLeft="60px">
                        <Box
                            component={Link}
                            to="/HomePage"
                            sx={{ textDecoration: "none" }}
                        >
                            <Typography variant="h6" color="#e3d5ca">Главная</Typography>
                        </Box>
                        <Box
                            component={Link}
                            to="/ListBooks"
                            sx={{ textDecoration: "none" }}
                        >
                            <Typography variant="h6" color="#e3d5ca">Моя библиотека</Typography>
                        </Box>
                    </Stack>
                )}

                <Box sx={{
                    ml: 'auto',
                    display: 'flex',
                    gap: { xs: 1, sm: 2 }
                }}>
                    {isAuth ? (
                        <UserMenu isMobile={isMobile} />
                    ) : (
                        renderAuthButtons()
                    )}
                </Box>
            </Toolbar>

            {/* Мобильное меню */}
            {isMobile && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '8px 0',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <Box
                        component={Link}
                        to="/HomePage"
                        sx={{
                            textDecoration: "none",
                            margin: '0 16px'
                        }}
                    >
                        <Typography variant="body2" color="#e3d5ca">Главная</Typography>
                    </Box>
                    <Box
                        component={Link}
                        to="/ListBooks"
                        sx={{
                            textDecoration: "none",
                            margin: '0 16px'
                        }}
                    >
                        <Typography variant="body2" color="#e3d5ca">Библиотека</Typography>
                    </Box>
                </Box>
            )}
        </AppBar>
    )
}

export default Navigation;