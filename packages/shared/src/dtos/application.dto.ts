import { ApplicationTypeDTO } from "./applicationType.dto";
import { PersonDTO } from "./person.dto";
import { ApplicationStatus } from '../types/application';
import { UserDTO } from "./user.dto";

export interface ApplicationDTO {
    id: number;
    person: PersonDTO;
    application_type: ApplicationTypeDTO;
    application_status: ApplicationStatus
    created_by_user: UserDTO;
    paid_fees: number;
    last_status_date: Date;
    application_date: Date;
}