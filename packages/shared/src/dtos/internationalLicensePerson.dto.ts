import { InternationalLicenseDTO } from './internationalLicense.dto.js';
import { PersonDTO } from './person.dto.js';

export interface InternationalLicensePersonDTO {
    international_license: InternationalLicenseDTO,
    person: PersonDTO
}