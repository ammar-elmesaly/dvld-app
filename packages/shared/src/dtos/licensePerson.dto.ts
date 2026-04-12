import { LicenseDTO } from './license.dto.js';
import { PersonDTO } from './person.dto.js';

export interface LicensePersonDTO {
    license: LicenseDTO,
    person: PersonDTO
}