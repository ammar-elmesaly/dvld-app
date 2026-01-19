import { PersonRepo } from "../repositories/PersonRepo";
import { UserRepo } from "../repositories/UserRepo";
import { AppError } from "../types/errors";
import { hash } from "../utils/hashUtil";

export const getAllUsers = () => {
    return UserRepo.find({ relations: { person: true } });
}

export const getUserByName = async (username: string) => {
    return UserRepo.findOneBy({ username });
}

export const createNewUser = async (personId: number, username: string, password: string, isActive: boolean) => {
    const person = await PersonRepo.findOne({
        where: { id: personId },
        relations: { user: true }
    });

    if (!person)
        throw new AppError('Person is not found', 404);

    if (person.user)
        throw new AppError('A user with this person already exists', 400);
    
    const hashedPassword = await hash(password);

    const newUser = UserRepo.create({
        person,
        username,
        password: hashedPassword,
        is_active: isActive
    });

    return newUser.save();
}