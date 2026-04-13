export function yearsAgo(years: number): Date {
    const d = new Date();
    d.setFullYear(d.getFullYear() - years);
    return d;
}

// Format date object because <input> min attribute doesn't accept any other format
// except YYYY-MM-DD
export function toInputDate(date: Date | string) {
    const validDate = new Date(date);
    
    const y = validDate.getFullYear();
    const m = String(validDate.getMonth() + 1).padStart(2, '0');
    const d = String(validDate.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}