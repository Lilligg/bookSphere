import {Box, Button, Divider, MenuItem, TextField, Typography} from "@mui/material";
import QuoteCard from "../../editingBook/QuoteCard.jsx";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { setListQuotes } from "../../../redux/book/bookSlice.js";

const QuoteTabs = (props) => {
    const { currentBook } = props;
    const dispatch = useDispatch();
    const { listQuote } = useSelector((state) => state.book);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        dispatch(setListQuotes({
            idBook: currentBook.id,
            type: "allQuotes"
        }));
    }, [currentBook.id, dispatch]);

    const onChange = (event) => {
        setSelected(event.target.value)
        dispatch(setListQuotes({
            idBook: currentBook.id,
            type: "personage",
            personageName: event.target.value
        }))
    }

    const clear = () => {
        dispatch(setListQuotes({
            idBook: currentBook.id,
            type: "allQuotes"
        }));
        setSelected("")
    }

    if (listQuote?.length === 0) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1">Цитаты не найдены</Typography>
            </Box>
        );
    }

    return(
        <Box display="flex" flexDirection={{ xs: 'column-reverse', md: 'row' }} >
            <Box width={{ xs: '100%', md: '75%' }}>
                <Box>
                    {listQuote.map((quote, index) => (
                        <QuoteCard quotes={quote} key = {index}/>
                    ))}
                </Box>
            </Box>
            <Divider
                orientation={{ xs: 'horizontal', md: 'vertical' }}
                flexItem
                sx={{
                    margin: { xs: '0 0px', md: '0 26px'},
                    borderRightWidth: '2px',
                }}
            />
            <Box
                display="flex"
                align-items="center"
                flexDirection="column"
                justifyContent="flex-start"
                width={{ xs: '100%', md: '25%' }}
            >
                <Typography variant="body1">Сортировка</Typography>

                    <TextField
                             select
                             fullWidth
                             margin="normal"
                             label="Персонаж"
                             name="sort"
                             value={selected}
                             onChange={onChange}
                >
                    {currentBook.personages.map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>

                <Button onClick={clear}>Очистить</Button>
            </Box>
        </Box>
   )
}

export default QuoteTabs