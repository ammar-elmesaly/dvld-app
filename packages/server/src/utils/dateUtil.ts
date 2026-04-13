export const isExpired = (date: Date | string) => {
    const validDate = new Date(date);
    const today = new Date();
    return today >= validDate;
}

export const isValidTestAppointment = (appointmentDate: Date | string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const compareDate = new Date(appointmentDate);
    compareDate.setHours(0, 0, 0, 0);

    return compareDate >= today;
};

export const isValidPersonAge = (dob: Date | string, minAge: number = 18, maxAge: number = 100) => {
    const today = new Date();
    const validDate = new Date(dob);

    const minAgeDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    const maxAgeDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());

    // dob > minAgeDate means they are TOO YOUNG (born after the 18-year cutoff)
    // dob < maxAgeDate means they are TOO OLD (born before the 100-year cutoff)
    if (validDate > minAgeDate || validDate < maxAgeDate) {
        return false;
    }

    return true;
}