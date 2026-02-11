import { InternationalLicenseDTO } from "./internationalLicense.dto";
import { PersonDTO } from "./person.dto";

export interface InternationalLicensePersonDTO {
    international_license: InternationalLicenseDTO,
    person: PersonDTO
}