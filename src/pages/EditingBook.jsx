import { Box, Button, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, {useState } from "react";
import { genreOptions } from "../constants/fieldOptions";
import FieldEditingForm from "../components/FieldEditingForm";
import { addBook } from "../redux/book/bookSlice";
import AddPersonageForm from "../components/AddPersonageForm";
import PersonageCard from "../components/PersonageCard";
import { v4 as uuidv4 } from 'uuid';

const EditingBook = () => {
    const dispatch = useDispatch();
    const [isAddPersonageOpen, setIsAddPersonageOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        author: "",
        avatar: "",
        genre: [],
        yearPublication: "",
        personages: [],
        quotes: [],
        rating: {
            overall: 0,
            styleMastery: 0,
            characterDepth: 0,
            plotConsistency: 0,
            worldBuildingScore: 0,
            thematicWeight: 0,
            emotionalImpact: 0,
            readingDifficulty: 0,
            rereadValue: 0,
        },
    });

    const fieldGroups = [
        {
            title: "Основная информация",
            fields: [
                {
                    label: "Название",
                    name: "title",
                    type: "text",
                    required: true
                },
                {
                    label: "Автор",
                    name: "author",
                    type: "text",
                    required: true
                },
                {
                    label: "Жанр",
                    name: "genre",
                    type: "multiselect",
                    options: genreOptions
                },
                {
                    label: "Год публикации",
                    name: "yearPublication",
                    type: "text",
                    required: true
                },
            ]
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMultiSelectChange = (name) => (e) => {
        const { value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleAddPersonage = (newPersonage) => {
        const personageWithId = {
            ...newPersonage,
            id: uuidv4(),
        };

        setFormData(prev => ({
            ...prev,
            personages: [...prev.personages, personageWithId],
        }));
        setIsAddPersonageOpen(false);
    };

    const handleRemovePersonage = (personageId) => {
        setFormData(prev => ({
            ...prev,
            personages: prev.personages.filter(p => p.id !== personageId),
        }));
    };

    const handleSubmit = () => {
        const newBook = {
            ...formData,
            id: uuidv4(),
        };

        dispatch(addBook(newBook));
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Добавление новой книги
            </Typography>

            {fieldGroups.map((group, index) => (
                <FieldEditingForm
                    key={index}
                    group={group}
                    formData={formData}
                    handleChange={handleChange}
                    handleMultiSelectChange={handleMultiSelectChange}
                />
            ))}

            <Box mt={4}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">
                        Персонажи ({formData.personages.length})
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => setIsAddPersonageOpen(true)}
                    >
                        Добавить персонажа
                    </Button>
                </Box>

                {formData.personages.length > 0 ? (
                    <Grid container spacing={2}>
                        {formData.personages.map((personage) => (
                            <Grid item xs={12} sm={6} md={4} key={personage.id}>
                                <PersonageCard
                                    personage={personage}
                                    onDelete={() => handleRemovePersonage(personage.id)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        Добавьте персонажей книги
                    </Typography>
                )}
            </Box>

            <AddPersonageForm
                open={isAddPersonageOpen}
                onClose={() => setIsAddPersonageOpen(false)}
                onSave={handleAddPersonage}
            />

            <Button
                type="button"
                variant="contained"
                sx={{ mt: 3 }}
                fullWidth
                onClick={handleSubmit}
            >
                Сохранить изменения
            </Button>
        </Box>
    );
};

export default EditingBook;