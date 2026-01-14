import { PersonRepo } from "../repositories/PersonRepo";
import { Gender } from '@dvld/shared/src/types/person';
import { CountryRepo } from "../repositories/CountryRepo";
import { AppError } from "../types/errors";

export const getAllPersons = async () => {
    const persons = await PersonRepo.find({ relations: { national_country: true } });
    return persons.map(person => ({
        ...person,
        national_country: person.national_country.country_name
    }));
}

export const getPersonById = async (personId: number) => {
    const person = await PersonRepo.findOne({
        where: { id: personId },
        relations: {
            national_country: true
        }
    });

    if (!person)
        throw new AppError("Person not found", 404);
    
    return {
        ...person,
        national_country: person.national_country.country_name
    };

}

export const addNewPerson = async (
    firstName: string,
    secondName: string,
    thirdName: string,
    lastName: string,
    nationalId: string,
    dateOfBirth: string,
    gender: Gender,
    address: string,
    phoneNumber: string,
    email: string,
    nationalCountryId: number,
    personalPhoto?: string,
) => {

    const country = await CountryRepo.findOneBy({ id: nationalCountryId });

    if (!country)
        throw new AppError('Country not found', 404);

    const newPerson = PersonRepo.create({
        first_name: firstName,
        second_name: secondName,
        third_name: thirdName,
        last_name: lastName,
        national_id: nationalId,
        date_of_birth: dateOfBirth,
        gender,
        address,
        phone_number: phoneNumber,
        email,
        national_country: country,
        personal_photo: personalPhoto
    });

    return newPerson.save();
}