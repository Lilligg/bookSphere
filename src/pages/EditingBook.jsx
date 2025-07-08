import {Box, Button, Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import FieldEditingForm from "../components/FieldEditingForm";
import {addBook, setCurrentBookById, updateBook} from "../redux/book/bookSlice";
import AddPersonageForm from "./AddPersonageForm.jsx";
import PersonageCard from "../components/editingBook/PersonageCard.jsx";
import { v4 as uuidv4 } from 'uuid';
import { EDITING_BOOK_FIELD_GROUP } from "../constants/editingBook/EDITING_BOOK_FIELD_GROUP.js";
import EditingRatings from "../components/editingBook/EditingRatings.jsx";
import AddQuoteFormDialog from "./AddQuoteFormDialog.jsx";
import QuoteCard from "../components/editingBook/QuoteCard.jsx";
import AddAvatar from "../components/AddAvatar.jsx";
import { useNavigate, useParams } from "react-router-dom";
import {EDITING_STATISTIC_BOOK} from "../constants/editingBook/EDITING_STATISTIC_BOOK.js";

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
        status: "В планах",
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

    const validateFields = () => {
        const newErrors = {
            title: !formData.title.trim(),
            author: !formData.author.trim(),
            yearPublication: !formData.yearPublication
        };
        return !Object.values(newErrors).some(error => error);
    };

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
        if (!validateFields()) {
            alert("Заполните обязательные поля: название, автор, год публикации")
            return;
        }

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
        <Box backgroundColor = '#E6CCB2' padding={{xs: 2, sm: 3}}>

            <Typography variant="h4" gutterBottom align="center" color="#7F5539">
                {id? "Изменение данных книги: " + [currentBook.title] :
                    "Добавление новой книги"
                }
            </Typography>

            <Box display="flex" flexDirection={{xs: "column", md: "row"}}>
                <Box width={{xs: "100%", md: "70%"}} marginRight={{xs: 0, md: "30px"}}>
                    {EDITING_BOOK_FIELD_GROUP.map((group, index) => (
                        <FieldEditingForm
                            key={index}
                            group={group}
                            formData={formData}
                            handleChange={handleChange}
                            handleMultiSelectChange={handleMultiSelectChange}
                        />
                    ))}

                    <Box mt={4}>
                        <Box
                            display="flex"
                            flexDirection={{xs: "column", sm: "row"}}
                            justifyContent="space-between"
                            alignItems={{xs: "flex-start", sm: "center"}}
                            mb={2}
                            gap={1}
                        >
                            <Typography variant="h6">
                                Персонажи ({formData.personages.length})
                            </Typography>
                            <Button
                                sx={{
                                    backgroundColor: '#7F5539',
                                    color: '#FFFFFF',
                                    width: {xs: "100%", sm: "auto"},
                                }}
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
                        <Box
                            display="flex"
                            flexDirection={{xs: "column", sm: "row"}}
                            justifyContent="space-between"
                            alignItems={{xs: "flex-start", sm: "center"}}
                            mb={2}
                            gap={1}
                        >
                            <Typography variant="h6">
                                Цитаты ({formData.quotes.length})
                            </Typography>
                            <Button
                                sx={{
                                    backgroundColor: '#7F5539',
                                    color: '#FFFFFF',
                                    width: {xs: "100%", sm: "auto"},
                                }}
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

                    <AddQuoteFormDialog
                    open={isAddQuoteOpen}
                    onClose={() => setIsAddQuoteOpen(false)}
                    setFormData={setFormData}
                    />
                </Box>

                <Box width={{xs: "100%", md: "30%"}} mt={{xs: 4, md: 0}}>

                    {EDITING_STATISTIC_BOOK.map((group, index) => (
                        <FieldEditingForm
                            key={index}
                            group={group}
                            formData={formData.statistics}
                            handleChange={(e) => {
                                const { name, value } = e.target;
                                setFormData(prev => ({
                                    ...prev,
                                    statistics: {
                                        ...prev.statistics,
                                        [name]: value // Просто обновляем поле в statistics
                                    }
                                }));
                            }}
                            handleMultiSelectChange={handleMultiSelectChange}
                        />
                    ))}

                    <EditingRatings setFormData={setFormData} formData={formData} />

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
                fullWidth
                onClick={handleSubmit}
                sx={{
                    backgroundColor: '#7F5539',
                    color: '#FFFFFF',
                }}
            >
                {id? "Сохранить изменения" : "Добавить книгу"}
            </Button>
        </Box>
    );
};

export default EditingBook;