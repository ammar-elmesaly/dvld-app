import { ApplicationType } from "../entities/ApplicationType";

export function getAllApplicationTypes() {
    return ApplicationType.find();
}

export function getApplicationTypeById(applicationTypeId: number) {
    return ApplicationType.findOneBy({ id: applicationTypeId });
}