import { PersonRepo } from "../repositories/PersonRepo";
import { Gender } from '@dvld/shared/src/types/person';
import { CountryRepo } from "../repositories/CountryRepo";
import { AppError } from "../types/errors";

export const getAllPersons = () => {
    return PersonRepo.find({ relations: { national_country: true } });
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
    
    return person;

}

export const getPersonByNationalId = async (nationalId: string) => {
    const person = await PersonRepo.findOne({
        where: { national_id: nationalId },
        relations: {
            national_country: true
        }
    });

    if (!person)
        throw new AppError("Person not found", 404);
    
    return person;

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