export const getRandomUniqueBooks = (books, count=5) => {
    if (books.length <= count) return [...books];

    const result = [];
    const indexes = new Set();

    while (result.length < count) {
        const randomIndex = Math.floor(Math.random() * books.length);
        if (!indexes.has(randomIndex)) {
            indexes.add(randomIndex);
            result.push(books[randomIndex]);
        }
    }

    return result;
};