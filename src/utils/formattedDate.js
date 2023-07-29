export const formattedDate = (start, end) => {
    const startDate = start.toLocaleDateString();
    const endDate = end.toLocaleDateString();
    return `${startDate} to ${endDate}`;
};
