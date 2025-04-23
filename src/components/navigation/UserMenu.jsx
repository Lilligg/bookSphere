import { useState } from "react";
import { Avatar, Box, Button, Menu, MenuItem } from "@mui/material";
import avatar from "./../../assets/assets.png"
import { Link } from "react-router-dom";
import { USER_MENU } from "../../constants/navigation/USER_MENU.js";

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
                {USER_MENU.map((item) => (
                    <MenuItem
                        component={Link}
                        to={item.link}
                        onClick={handleClose}
                    >
                        {item.label}
                    </MenuItem>))
                }
                <MenuItem onClick={handleClose}>Выйти</MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;