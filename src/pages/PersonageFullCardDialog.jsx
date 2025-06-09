import { Box, Dialog, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import malePersonage from "../assets/malePersonage.png";
import womanPersonage from "../assets/womanPersonage.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPersonageById } from "../redux/book/bookSlice.ts";
import {Link} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const PersonageFullCardDialog = ({ open, onClose, idPersonage, idBook }) => {
    const dispatch = useDispatch();
    const currentPersonage = useSelector(state => state.book.currentPersonage);

    useEffect(() => {
        if (open && idPersonage) {
            dispatch(setCurrentPersonageById({ idPersonage, idBook }));
        }
    }, [open, idPersonage, idBook, dispatch]);

    if (!currentPersonage) return null;

    const {
        name = 'Неизвестный персонаж',
        gender = '',
        avatar = null,
        characterStatus = 'Статус не указан',
        lifeStatus = 'Статус не указан',
        description = 'Описание отсутствует',
        appearance = 'Описание отсутствует',
        character = 'Описание отсутствует',
        effectOnStory = 'Описание отсутствует',
    } = currentPersonage;

    return (
        <Dialog open={open} onClose={onClose} >
            <Box position="relative" padding="10px">

                <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
                    <IconButton
                        component={Link}
                        to={`/EditingBooks/`}
                    >
                        <EditIcon/>
                    </IconButton>
                    <IconButton
                        onClick={onClose}

                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box display="flex" flexDirection="column">
                    <Box display="flex" flexDirection="row">
                        <Box display="flex" flexDirection="column">
                            <Box display="flex" flexDirection="row" >
                                <Typography variant="h4">
                                    {name}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        ml: 1,
                                        color: gender === "male" ? 'primary.main' : 'secondary.main'
                                    }}
                                >
                                    {gender === "male" ? '♂' : '♀'}
                                </Typography>
                            </Box>
                            <Typography variant="subtitle1">
                                Статус персонажа: {characterStatus}
                            </Typography>
                            <Typography variant="subtitle1">
                                Жизненный статус: {lifeStatus}
                            </Typography>
                        </Box>

                        <Box
                            component="img"
                            src={avatar || (gender === "male" ? malePersonage : womanPersonage)}
                            alt={name}
                            sx={{
                                width: '200px',
                                height: '200px',
                            }}
                        />
                    </Box>

                    <Box>

                        <Typography variant="h6">
                            Внешность:
                        </Typography>
                        <Typography variant="body1">
                            {appearance}
                        </Typography>

                        <Typography variant="h6">
                            Характер:
                        </Typography>
                        <Typography variant="body1">
                            {character}
                        </Typography>

                        <Typography variant="h6">
                            Отношения с другими персонажами:
                        </Typography>
                        <Typography variant="body1">
                            {description}
                        </Typography>

                        <Typography variant="h6">
                            Влияние на сюжет
                        </Typography>
                        <Typography variant="body1">
                            {effectOnStory}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
};

export default PersonageFullCardDialog;