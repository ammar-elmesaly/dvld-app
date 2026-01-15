import { PersonRepo } from "../repositories/PersonRepo";
import { UserRepo } from "../repositories/UserRepo";
import { AppError } from "../types/errors";
import { hash } from "../utils/hashUtil";

export const getAllUsers = () => {
    return UserRepo.find({ relations: { person: true } });
}

export const createNewUser = async (personId: number, username: string, password: string, isActive: boolean) => {
    const person = await PersonRepo.findOneBy({ id: personId });

    if (!person)
        throw new AppError('Person is not found', 404);

    const hashedPassword = await hash(password);

    const newUser = UserRepo.create({
        person,
        username,
        password: hashedPassword,
        is_active: isActive
    });

    return newUser.save();
}