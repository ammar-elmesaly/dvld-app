import { ApplicationType } from "../entities/ApplicationType";
import { AppError } from "../types/errors";

export function getAllApplicationTypes() {
    return ApplicationType.find();
}

export function getApplicationTypeById(applicationTypeId: number) {
    return ApplicationType.findOneBy({ id: applicationTypeId });
}

export async function getApplicationTypeByName(systemName: string) {
    const applicationType = await ApplicationType.findOneBy({ system_name: systemName });
    if (!applicationType)
        throw new AppError('Application Type not found', 404);

    return applicationType;
}