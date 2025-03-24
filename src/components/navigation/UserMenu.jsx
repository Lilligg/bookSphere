import {Avatar, Box, Button, Menu, MenuItem} from "@mui/material";
import avatar from "./../../assets/assets.png"
import {useState} from "react";
import {Link} from "react-router-dom";


const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Button
                id="user-menu-button"
                aria-controls={open ? 'user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar
                    alt="Аватар пользователя"
                    src={avatar}
                />
            </Button>

            <Menu
                id="user-menu"
                aria-labelledby="user-menu-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem
                    component={Link}
                    to="/UserProfile"
                    onClick={handleClose}
                >
                    Профиль
                </MenuItem>

                <MenuItem
                    component={Link}
                    to="/EditingProfile"
                    onClick={handleClose}
                >
                    Настройки профиля
                </MenuItem>

                <MenuItem
                    component={Link}
                    to="/ListBooks"
                    onClick={handleClose}
                >
                    Мои книги
                </MenuItem>

                <MenuItem onClick={handleClose}>Выйти</MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;