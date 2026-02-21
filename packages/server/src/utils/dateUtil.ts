export const isExpired = (date: Date) => {
    const today = new Date();
    return today >= date;
}