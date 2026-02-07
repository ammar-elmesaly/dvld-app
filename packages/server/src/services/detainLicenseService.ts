import { IsNull } from "typeorm";
import { DetainedLicense } from "../entities/DetainedLicense";
import { License } from "../entities/License";
import { AppError } from "../types/errors";
import { UserRepo } from "../repositories/UserRepo";

export async function detainLicense(licenseId: number, createdByUserId: number, fineFees: number) {
    const license = await License.findOneBy({ id: licenseId });
    if (!license)
        throw new AppError('License not found', 404);

    if (!license.is_active)
        throw new AppError('Cannot detain an inactive license', 404);
    
    const licenseAlreadyDetained = await DetainedLicense.exists({
        where: {
            license,
            release_date: IsNull()
        }
    });

    if (licenseAlreadyDetained)
        throw new AppError('Cannot detain this license, it is already detained', 400);

    const createdByUser = await UserRepo.findOneBy({ id: createdByUserId });
    if (!createdByUser)
        throw new AppError('User not found', 404);

    const detainedLicense = await DetainedLicense.create({
        license,
        detain_date: new Date(),
        fine_fees: fineFees,
        created_by_user: createdByUser
    }).save();

    return detainedLicense.id;
}