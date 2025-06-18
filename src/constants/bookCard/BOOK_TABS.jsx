import RatingTabs from "../../components/bookCard/tabsBook/RatingTabs.jsx";
import AboutTabs from "../../components/bookCard/tabsBook/AboutTabs.jsx";
import PersonagesTabs from "../../components/bookCard/tabsBook/PersonagesTabs.jsx";
import QuoteTabs from "../../components/bookCard/tabsBook/QuoteTabs.jsx";
import ImpressionsTabs from "../../components/bookCard/tabsBook/ImpressionsTabs.jsx";
import StatisticTabs from "../../components/bookCard/tabsBook/StatisticTabs.jsx";

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
    },
]