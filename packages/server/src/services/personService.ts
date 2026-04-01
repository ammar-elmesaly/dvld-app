import { PersonRepo } from "../repositories/PersonRepo";
import { Gender } from '@dvld/shared';
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

export const getPersonWithDriverById = async (personId: number) => {
    const person = await PersonRepo.findOne({
        where: { id: personId },
        relations: {
            national_country: true,
            driver: true
        }
    });

    if (!person)
        throw new AppError("Person not found", 404);
    
    return person;

}

export const getPersonByDriverId = async (driverId: number) => {
    const person = await PersonRepo.findOne({
        where: { driver: { id: driverId } },
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

    const newPerson = await PersonRepo.create({
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
    }).save();

    return newPerson.id;
}

export const editPersonById = async (
    personId: number,
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
    const person = await getPersonById(personId);

    if (nationalCountryId) {
        const country = await CountryRepo.findOneBy({ id: nationalCountryId });
        if (!country)
            throw new AppError('Country not found', 404);

        person.national_country = country;
    }

    Object.assign(person, {
        first_name: firstName,
        second_name: secondName,
        third_name: thirdName,
        last_name: lastName,
        national_id: nationalId,
        date_of_birth: dateOfBirth,
        gender: gender,
        address: address,
        phone_number: phoneNumber,
        email: email,
        personal_photo: personalPhoto
    });

    const savedPerson = await person.save();
    return savedPerson.id;
}

export const deletePersonById = async (personId: number) => {
    const deletedPerson = await getPersonById(personId);

    const id = deletedPerson.id;
    await deletedPerson.remove();
    
    return id;
}