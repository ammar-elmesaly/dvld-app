import { ApplicationTypeSystemName } from '@dvld/shared';
import { ApplicationType } from "../entities/ApplicationType";
import { AppError } from "../types/errors";

export function getAllApplicationTypes() {
    return ApplicationType.find();
}

export async function getApplicationTypeById(applicationTypeId: number) {
    const applicationType = await ApplicationType.findOneBy({ id: applicationTypeId });
    if (!applicationType)
        throw new AppError('Application Type not found', 404);

    return applicationType;
}

export async function getApplicationTypeByName(systemName: ApplicationTypeSystemName) {
    const applicationType = await ApplicationType.findOneBy({ system_name: systemName });
    if (!applicationType)
        throw new AppError('Application Type not found', 404);

    return applicationType;
}

export async function editApplicationTypeById(applicationTypeId: number, typeName: string, typeFees: number, defaultValidityLength: number) {
    const applicationType = await getApplicationTypeById(applicationTypeId);

    Object.assign(applicationType, {
        type_name: typeName,
        type_fees: typeFees,
        default_validity_length: defaultValidityLength
    });

    const updateApplicationType = await applicationType.save();
    return updateApplicationType.id;
}