import { LicenseDTO } from "./license.dto";
import { PersonDTO } from "./person.dto";

export interface LicensePersonDTO {
    license: LicenseDTO,
    person: PersonDTO
}