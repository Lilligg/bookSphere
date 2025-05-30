import RatingTabs from "../../components/bookCard/RatingTabs.jsx";
import AboutTabs from "../../components/bookCard/AboutTabs.jsx";
import PersonagesTabs from "../../components/bookCard/PersonagesTabs.jsx";
import QuoteTabs from "../../components/bookCard/QuoteTabs.jsx";
import ImpressionsTabs from "../../components/bookCard/ImpressionsTabs.jsx";

export const BOOK_TABS = (currentBook) => [
    {
        value: "1",
        label: "О книге",
        content: <AboutTabs currentBook = {currentBook} />
    },
    {
        value: "2",
        label: "Персонажи",
        content: <PersonagesTabs currentBook = {currentBook}/>
    },
    {
        value: "3",
        label: "Цитаты",
        content: <QuoteTabs currentBook = {currentBook}/>
    },
    {
        value: "4",
        label: "Впечатления",
        content: <ImpressionsTabs currentBook = {currentBook}/>
    },
    {
        value: "5",
        label: "Оценка",
        content: <RatingTabs currentBook = {currentBook}/>
    }
]