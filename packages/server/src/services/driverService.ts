import { Driver } from "../entities/Driver";
import { PersonRepo } from "../repositories/PersonRepo";
import { UserRepo } from "../repositories/UserRepo";
import { AppError } from "../types/errors";

export async function createNewDriver(createdByUserId: number, personId: number) {
    const user = await UserRepo.findOneBy({ id: createdByUserId });
    if (!user)
        throw new AppError('User not found', 404);

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