import PersonalInformationTab from "../../components/userProfile/PersonalInformationTab.jsx";
import LiteraryPreferencesTab from "../../components/userProfile/LiteraryPreferencesTab.jsx";
import BookListTab from "../../components/userProfile/BookListTab.jsx";

export const LEFT_PROFILE_TABS = [
    {
        value: "1",
        label: "Личная информация",
        content: <PersonalInformationTab/>
    },
    {
        value: "2",
        label: "Литературные предпочтения",
        content: <LiteraryPreferencesTab/>
    },
    {
        value: "3",
        label: "Книжная полка",
        content: <BookListTab/>
    },
]