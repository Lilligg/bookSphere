import { useState } from "react";
import { Avatar, Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { USER_MENU } from "../../constants/navigation/USER_MENU.js";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user/userSlice.js";

const UserMenu = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { user } = useSelector((state) => state.user);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutClick = () =>{
        dispatch(logout())
    }

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
                    src={user.avatar}
                />
                <Typography variant="body1" color = "white" margin="10px">{user.name}</Typography>
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
                <MenuItem onClick={logoutClick}>Выйти</MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;