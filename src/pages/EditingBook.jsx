import {Box, Button, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import FieldEditingForm from "../components/FieldEditingForm";
import {addBook, setCurrentBookById, updateBook} from "../redux/book/bookSlice";
import AddPersonageForm from "../components/editingBook/AddPersonageForm.jsx";
import PersonageCard from "../components/editingBook/PersonageCard.jsx";
import { v4 as uuidv4 } from 'uuid';
import { EDITING_BOOK_FIELD_GROUP } from "../constants/EDITING_BOOK_FIELD_GROUP.js";
import Ratings from "../components/editingBook/Ratings.jsx";
import AddQuoteForm from "../components/editingBook/AddQuoteForm.jsx";
import QuoteCard from "../components/editingBook/QuoteCard.jsx";
import AddAvatar from "../components/AddAvatar.jsx";
import { useNavigate, useParams } from "react-router-dom";
import {EDITING_STATISTIC_BOOK} from "../constants/EDITING_STATISTIC_BOOK.js";

const INITIAL_FORM_BOOK = {
    id: "",
    title: "",
    author: "",
    avatar: null,
    genre: [],
    yearPublication: "",
    about: "",
    impressions: "",
    personages: [],
    quotes: [],
    overallRating: 0,
    rating: {
        styleMastery: 0,
        characterDepth: 0,
        plotConsistency: 0,
        worldBuildingScore: 0,
        thematicWeight: 0,
        emotionalImpact: 0,
        readingDifficulty: 0,
        rereadValue: 0,
    },
    statistics: {
        status: "В процессе" | "Завершен" | "Заморожено" | "В планах",
        startDateOfReading: "",
        endDateOfReading: "",
        totalNumberOfPages: 0,
        numberOfPagesRead: 0,
    }
}

const EditingBook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { currentBook } = useSelector((state) => state.book);

    const [isAddPersonageOpen, setIsAddPersonageOpen] = useState(false);
    const [isAddQuoteOpen, setIsAddQuoteOpen] = useState(false);
    const [formData, setFormData] = useState(INITIAL_FORM_BOOK);

    useEffect(() => {
        if (id) {
            dispatch(setCurrentBookById(id));
        }
        else {
            setFormData({
                ...INITIAL_FORM_BOOK,
            });
        }
    }, [id, dispatch]);

    useEffect(() => {
        if(!id) return;

        setFormData({
            ...INITIAL_FORM_BOOK,
            ...currentBook
        });
    }, [currentBook, id]);

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

    const avatarSubmit = (avatar) => {
        setFormData(prev => ({
            ...prev,
            avatar: avatar,
        }))
    }

    const handleSubmit = () => {
        if (id) {
            const newBook = {
                ...formData
            }

            dispatch(updateBook(newBook))
            navigate(`/bookCard/${id}`);
        }

        if (!id) {
            const newBook = {
                ...formData,
                id: uuidv4(),
            };

            dispatch(addBook(newBook));
            navigate(`/bookCard/${newBook.id}`)
            console.log(newBook)
        }

    };

    return (
        <Box backgroundColor = '#F8F4E3' padding="25px">
            <Typography variant="h5" gutterBottom>
                {id? "Изменение данных книги: " + [currentBook.title] :
                    "Добавление новой книги"
                }
            </Typography>

            <Box display="flex" flexDirection="row">
                <Box width="70%" padding="30px">
                    {EDITING_BOOK_FIELD_GROUP.map((group, index) => (
                        <FieldEditingForm
                            key={index}
                            group={group}
                            formData={formData}
                            handleChange={handleChange}
                            handleMultiSelectChange={handleMultiSelectChange}
                        />
                    ))}

                    <Ratings setFormData={setFormData} formData={formData} />

                    <Box mt={4}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={2}
                        >
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

                    <Box mt={4}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h6">
                                Цитаты ({formData.quotes.length})
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => setIsAddQuoteOpen(true)}
                            >
                                Добавить цитату
                            </Button>
                        </Box>

                        {formData.quotes.length > 0 ? (
                            <Grid container spacing={2}>
                                {formData.quotes.map((quotes) => (
                                    <Grid item xs={12} sm={6} md={4} key={quotes.id}>
                                        <QuoteCard
                                            quotes={quotes}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                Добавьте цитаты книги
                            </Typography>
                        )}
                    </Box>

                    <AddPersonageForm
                        open={isAddPersonageOpen}
                        onClose={() => setIsAddPersonageOpen(false)}
                        setFormData={setFormData}
                    />

                    <AddQuoteForm
                    open={isAddQuoteOpen}
                    onClose={() => setIsAddQuoteOpen(false)}
                    setFormData={setFormData}
                    />
                </Box>

                <Box width="30%">

                    {EDITING_STATISTIC_BOOK.map((group, index) => (
                        <FieldEditingForm
                            key={index}
                            group={group}
                            formData={formData}
                            handleChange={handleChange}
                            handleMultiSelectChange={handleMultiSelectChange}
                        />
                    ))}

                    <Box>
                    <AddAvatar
                        title = "Обложка книги"
                        type = {id? "typeBook" : "typeNewBook"}
                        onAvatarChange = {avatarSubmit}
                    />
                </Box>
                </Box>

            </Box>

            <Button
                variant="contained"
                sx={{ mt: 3 }}
                fullWidth
                onClick={handleSubmit}
            >
                {id? "Сохранить изменения" : "Добавить книгу"}
            </Button>
        </Box>
    );
};

export default EditingBook;