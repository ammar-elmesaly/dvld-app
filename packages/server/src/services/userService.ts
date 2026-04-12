import { PersonRepo } from '../repositories/PersonRepo.js';
import { UserRepo } from '../repositories/UserRepo.js';
import { AppError } from '../types/errors.js';
import { hash } from '../utils/hashUtil.js';

export const getAllUsers = () => {
    return UserRepo.find({ relations: { person: true } });
}

export const getUserByName = async (username: string) => {
    const user = await UserRepo.findOneBy({ username });
    if (!user)
        throw new AppError('User not found', 404);

    return user;
}

export const getUserById = async (userId: number) => {
    const user = await UserRepo.findOneBy({ id: userId });
    if (!user)
        throw new AppError('User not found', 404);

    return user;
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

    const newUser = await UserRepo.create({
        person,
        username,
        password: hashedPassword,
        is_active: isActive
    }).save();

    return newUser.id;
}

export const editUserById = async (userId: number, isActive: boolean) => {
    const user = await getUserById(userId);
    user.is_active = isActive;

    const updatedUser = await user.save();

    return updatedUser.id;
}

export const deleteUserById = async (userId: number, currentUserId: number) => {    
    if (currentUserId == userId)  // TODO: Behaviour could potentially be modified here
        throw new AppError('Cannot delete the current active user account', 400);

    const user = await getUserById(userId);
    const id = user.id;
    await user.remove();

    return id;
}