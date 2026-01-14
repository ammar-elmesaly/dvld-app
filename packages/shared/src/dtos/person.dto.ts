import { Gender } from '../types/person';

export interface PersonDTO {
    id: number;

    first_name: string;
    second_name: string;
    third_name: string;
    last_name: string;

    national_id: string;
    date_of_birth: string;
    gender: Gender;

    address: string;
    phone_number: string;
    email: string;

    national_country: string;

    personal_photo: string | null;
}
