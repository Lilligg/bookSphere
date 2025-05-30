import { Box } from "@mui/material";
import QuoteCard from "../editingBook/QuoteCard.jsx";

const QuoteTabs = (props) => {
    const { currentBook } = props;

    return(
       <Box>
           {currentBook.quotes.map((quote, index) => (
               <QuoteCard quotes={quote} key = {index}/>
           ))}
       </Box>
   )
}

export default QuoteTabs