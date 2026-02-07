import { PersonDTO } from '@dvld/shared/src/dtos/person.dto';
import { Person } from '../entities/Person';

export const toPersonDTO = (person: Person): PersonDTO => ({
    id: person.id,

    first_name: person.first_name,
    second_name: person.second_name,
    third_name: person.third_name,
    last_name: person.last_name,

    full_name: person.full_name,
    
    national_id: person.national_id,
    date_of_birth: person.date_of_birth.toLocaleDateString(),
    gender: person.gender,

    address: person.address,
    phone_number: person.phone_number,
    email: person.email,

    national_country: person.national_country.country_name,

    personal_photo: person.personal_photo ?? null
});
