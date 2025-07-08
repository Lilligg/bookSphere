import { Box, Button, Divider, Grid, MenuItem, TextField, Typography } from "@mui/material";
import PersonageCard from "../../editingBook/PersonageCard.jsx";
import PersonageFullCardDialog from "../../../pages/PersonageFullCardDialog.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListPerson } from "../../../redux/book/bookSlice.js";

const PersonagesTabs = ({ currentBook }) => {
    const dispatch = useDispatch();
    const { listPerson } = useSelector((state) => state.book);
    const [selectedFilter, setSelectedFilter] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [selectedPersonageId, setSelectedPersonageId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(setListPerson({
            idBook: currentBook.id,
            type: "allPerson"
        }));
    }, [currentBook.id, dispatch]);

    const handleCardClick = (personageId) => {
        setSelectedPersonageId(personageId);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedPersonageId(null);
    };

    const handleFilterChange = (event) => {
        const { value } = event.target;
        setSelectedFilter(value);

        if (value === "all") {
            dispatch(setListPerson({
                idBook: currentBook.id,
                type: "allPerson"
            }));
        } else {
            dispatch(setListPerson({
                idBook: currentBook.id,
                type: filterType,
                variant: value
            }));
        }
    };

    const handleFilterTypeChange = (event) => {
        setFilterType(event.target.value);
        setSelectedFilter("");
        dispatch(setListPerson({
            idBook: currentBook.id,
            type: "allPerson"
        }));
    };

    const clearFilters = () => {
        setSelectedFilter("");
        setFilterType("all");
        dispatch(setListPerson({
            idBook: currentBook.id,
            type: "allPerson"
        }));
    };

    if (!currentBook?.personages?.length) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1">Персонажи не найдены</Typography>
            </Box>
        );
    }

    // Получаем уникальные значения для фильтров
    const genderOptions = [...new Set(currentBook.personages.map(p => p.gender))];
    const statusOptions = [...new Set(currentBook.personages.map(p => p.characterStatus))];

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, gap: 3 }}>
            <Box sx={{ flex: 3 }}>
                <Grid container spacing={3}>
                    {(listPerson || currentBook.personages).map((personage) => (
                        <Grid item xs={12} sm={6} key={personage.id}>
                            <PersonageCard
                                personage={personage}
                                onClick={() => handleCardClick(personage.id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ flex: 1, p: 2, }}>
                <Typography variant="h6" gutterBottom>Фильтры</Typography>

                <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Тип фильтра"
                    value={filterType}
                    onChange={handleFilterTypeChange}
                >
                    <MenuItem value="all">Все</MenuItem>
                    <MenuItem value="gender">По полу</MenuItem>
                    <MenuItem value="characterStatus">По статусу</MenuItem>
                </TextField>

                {filterType !== "all" && (
                    <TextField
                        select
                        fullWidth
                        margin="normal"
                        label={filterType === "gender" ? "Пол" : "Статус"}
                        value={selectedFilter}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="all">Все</MenuItem>
                        {(filterType === "gender" ? genderOptions : statusOptions).map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                )}

                <Button
                    fullWidth
                    variant="outlined"
                    onClick={clearFilters}
                    sx={{ mt: 2 }}
                >
                    Сбросить фильтры
                </Button>
            </Box>

            <PersonageFullCardDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                idPersonage={selectedPersonageId}
                idBook={currentBook.id}
            />
        </Box>
    );
};

export default PersonagesTabs;