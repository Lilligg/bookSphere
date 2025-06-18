export const formatBirthday = (dateStr) => {
    if (!dateStr) return null;

    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const [year, month, day] = dateStr.split('-');
    const dayNum = parseInt(day, 10);
    return `${dayNum} ${months[parseInt(month) - 1]}`;
};