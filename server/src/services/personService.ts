import { PersonRepo } from "../repositories/PersonRepo";
import { Gender } from "../types/person";
import { CountryRepo } from "../repositories/CountryRepo";
import { AppError } from "../types/errors";

export const getAllPersons = () => {
    return PersonRepo.find();
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
    personalPhotoPath?: string,
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
        personal_photo_path: personalPhotoPath
    });

    return newPerson.save();
}