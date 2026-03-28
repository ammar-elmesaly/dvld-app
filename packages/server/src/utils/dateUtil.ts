export const isExpired = (date: Date) => {
    const today = new Date();
    return today >= date;
}

export const isValidTestAppointment = (appointmentDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const compareDate = new Date(appointmentDate);
    compareDate.setHours(0, 0, 0, 0);

    return compareDate >= today;
};

export const isValidPersonAge = (dob: Date, minAge: number = 18, maxAge: number = 100) => {
    const today = new Date();
    
    const minAgeDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    const maxAgeDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());

    // dob > minAgeDate means they are TOO YOUNG (born after the 18-year cutoff)
    // dob < maxAgeDate means they are TOO OLD (born before the 100-year cutoff)
    if (dob > minAgeDate || dob < maxAgeDate) {
        return false;
    }

    return true;
}