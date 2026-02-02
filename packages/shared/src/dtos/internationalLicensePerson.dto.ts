import { InternationalLicenseDTO } from "./internationalLicense.dto";
import { LicenseDTO } from "./license.dto";
import { PersonDTO } from "./person.dto";

export interface InternationalLicensePersonDTO {
    internationalLicense: InternationalLicenseDTO,
    person: PersonDTO
}