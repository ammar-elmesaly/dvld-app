import { IsNull } from "typeorm";
import { DetainedLicense } from "../entities/DetainedLicense";
import { License } from "../entities/License";
import { AppError } from "../types/errors";
import { UserRepo } from "../repositories/UserRepo";
import { newApplication } from "./applicationService";
import { DetainedLicenseRepo } from "../repositories/DetainLicenseRepo";

export async function detainLicense(licenseId: number, createdByUserId: number, fineFees: number) {
    const [license, createdByUser] = await Promise.all([
        License.findOne({
            where: {
                id: licenseId
            },
            relations: {
                detained_licenses: true
            }
        }),
        UserRepo.findOneBy({ id: createdByUserId })        
    ]);

    if (!license) throw new AppError('License not found', 404);
    if (!license.is_active) throw new AppError('Cannot detain an inactive license', 404);
    
    const licenseAlreadyDetained = license.detained_licenses.some(dl => dl.release_date === null);
    if (licenseAlreadyDetained) throw new AppError('Cannot detain this license, it is already detained', 400);

    if (!createdByUser) throw new AppError('User not found', 404);

    const detainedLicense = await DetainedLicense.create({
        license,
        detain_date: new Date(),
        fine_fees: fineFees,
        created_by_user: createdByUser
    }).save();

    return detainedLicense.id;
}

export async function releaseLicense(licenseId: number, releasedByUserId: number) {
    const releasedByUser = await UserRepo.findOneBy({ id: releasedByUserId });
    if (!releasedByUser)
        throw new AppError('User not found', 404);

    return DetainedLicenseRepo.manager.transaction(async (manager) => {
        const detainedLicense = await manager.findOne(DetainedLicense, {
            where: {
                release_date: IsNull(),
                license: { id: licenseId }
            },
            relations: {
                license: { driver: { person: true } }
            }
        });
        if (!detainedLicense)
            throw new AppError('Detained License not found', 404);

        const applicationId = await newApplication(
            detainedLicense.license.driver.person.id,
            'RELEASE_DETAINED_SERVICE',
            releasedByUserId
        );
        detainedLicense.release_date = new Date();
        detainedLicense.released_by_user = releasedByUser;
        detainedLicense.release_application = { id: applicationId } as any;  // Bare minimum that typeorm needs is an object with just id

        const updatedDetainedLicense = await manager.save(detainedLicense);

        return updatedDetainedLicense.license.id;
    });
}

export async function getDetainedLicenseWithLicenseId(licenseId: number) {
    const detainedLicense = await DetainedLicense.findOne({
        where: {
            release_date: IsNull(),
            license: { id: licenseId }
        },
        relations: {
            license: {
                driver: true
            },
            release_application: true
        }
    });
    if (!detainedLicense)
        throw new AppError('Detained License not found', 404);

    return detainedLicense;
}

export async function getAllDetainedLicenses() {
    return DetainedLicense.find({
        relations: {
            license: {
                driver: true
            },
            release_application: true
        }
    })
}