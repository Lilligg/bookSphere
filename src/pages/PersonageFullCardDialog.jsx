import {Box, Dialog, Typography, IconButton, Stack, Divider, DialogTitle, DialogContent} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import malePersonage from "../assets/malePersonage.png";
import womanPersonage from "../assets/womanPersonage.png";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPersonageById, removePersonage } from "../redux/book/bookSlice.ts";
import EditIcon from "@mui/icons-material/Edit";
import InformationSection from "../components/InformationSection.jsx";
import {PERSONAGE_FULL_INFO} from "../constants/bookCard/PERSONAGE_FULL_INFO.jsx";
import CakeIcon from "@mui/icons-material/Cake";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import AddPersonageForm from "./AddPersonageForm.jsx";
import DeleteIcon from '@mui/icons-material/Delete';

const PersonageFullCardDialog = ({ open, onClose, idPersonage, idBook }) => {
    const dispatch = useDispatch();
    const {currentPersonage} = useSelector(state => state.book);

    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
        if (open && idPersonage) {
            dispatch(setCurrentPersonageById({ idPersonage, idBook }));
        }
    }, [idPersonage, idBook, dispatch, open]);


    if (!currentPersonage) {return null}

    const openEditPersonage = () => {
        setOpenEdit(true);
    }

    const handleCloseEdit = () => {
        setOpenEdit(false);
        if (idPersonage) {
            dispatch(setCurrentPersonageById({ personageId: idPersonage, bookId: idBook }));
        }
    };

    const deletePersonage = () => {

        dispatch(removePersonage({bookId: idBook, personageId:idPersonage }));
        alert("Персонаж успешно удален")
        onClose()
    }

    return (
        <>
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            disableEnforceFocus
        >
            <DialogTitle>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Stack direction="row" >
                        <Typography variant="h4">{currentPersonage.name}</Typography>
                        <Typography
                            variant="h4"
                            sx={{
                                ml: 1,
                                color: currentPersonage.gender === "male" ? '#0f97ff' : '#e43473'
                            }}
                        >
                            {currentPersonage.gender === "male" ? <MaleIcon/> : <FemaleIcon/>}
                        </Typography>
                    </Stack>

                    <Box>
                        <IconButton
                            onClick={openEditPersonage}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            onClick={deletePersonage}
                        >
                            <DeleteIcon/>
                        </IconButton>
                        <IconButton
                            onClick={onClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Stack>
            </DialogTitle>

            <DialogContent dividers>
                <Stack spacing={3}>
                    {/* Основная информация */}
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        alignItems="flex-start"
                    >
                        <Stack spacing={2} sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CakeIcon sx={{ color: 'action.active', mr: 1.5 }} />
                                <Typography>
                                    <strong>Статус:</strong> {currentPersonage.characterStatus}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CakeIcon sx={{ color: 'action.active', mr: 1.5 }} />
                                <Typography>
                                    <strong>Жизненный статус:</strong> {currentPersonage.lifeStatus}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CakeIcon sx={{ color: 'action.active', mr: 1.5 }} />
                                <Typography>
                                    <strong>Возраст:</strong> {currentPersonage.age}
                                </Typography>
                            </Box>
                        </Stack>
                        <Box
                            component="img"
                            src={currentPersonage.avatar || (currentPersonage.gender === "male" ? malePersonage : womanPersonage)}
                            alt={currentPersonage.name}
                            sx={{
                                width: 200,
                                height: 200,
                                borderRadius: 4,
                                objectFit: 'cover',
                                alignSelf: { xs: 'center', sm: 'flex-start' }
                            }}
                        />
                    </Stack>

                    <Divider />

                    {/* Детальная информация */}
                    <Stack spacing={2}>
                        {PERSONAGE_FULL_INFO.map((position) => (
                            <InformationSection
                                key={position.title}
                                title={position.title}
                                content={currentPersonage[position.content]}
                                icon={position.icon}
                            />
                        ))}
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>

        <AddPersonageForm
            open={openEdit}
            onClose={handleCloseEdit}
            currentPersonage={currentPersonage}
            bookID={idBook}
        />

        </>
    );
};

export default PersonageFullCardDialog;