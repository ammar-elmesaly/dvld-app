import { Driver } from "../entities/Driver";
import { PersonRepo } from "../repositories/PersonRepo";
import { AppError } from "../types/errors";
import { getUserById } from "./userService";

export async function createOrGetDriver(createdByUserId: number, personId: number) {
    const user = await getUserById(createdByUserId)

    const oldDriver = await Driver.findOne({
        where: {
            person: { id: personId }
        }
    });
    if (oldDriver)
        return oldDriver.id;

    const person = await PersonRepo.findOneBy({ id: personId});
    if (!person)
        throw new AppError('Person not found', 404);

    const newDriver = await Driver.create({
        user,
        person,
    }).save();

    return newDriver.id;
}

export async function getDriverById(driverId: number) {
    const driver = await Driver.findOneBy({ id: driverId });
    if (!driver)
        throw new AppError('Driver not found', 404);

    return driver;
}