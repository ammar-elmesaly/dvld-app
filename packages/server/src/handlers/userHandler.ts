import { RequestHandler } from "express";
import * as userService from "../services/userService";
import { toUserDTO } from "../mappers/userMapper";

export const getAllUsersHandler: RequestHandler = async (_req, res) => {
    const users = await userService.getAllUsers();
    const usersMapped = users.map(user => toUserDTO(user));
    
    res.json(usersMapped);
}

export const createNewUserHandler: RequestHandler = async (req, res) => {
    const { personId, username, password, isActive } = req.body;

    const userId = await userService.createNewUser(personId, username, password, isActive);

    res.status(201).json(userId);

}

export const editUserByIdHandler: RequestHandler = async (req, res) => {
    const { userId } = req.params;
    const { isActive } = req.body;

    const updatedUserId = await userService.editUserById(userId as unknown as number, isActive);

    res.json(updatedUserId);
};

export const deleteUserByIdHandler: RequestHandler = async (req, res) => {
    const currentUserId = req.session.userId;
    const { userId } = req.params;

    const deletedUserId = await userService.deleteUserById(userId as unknown as number, currentUserId!);

    res.json(deletedUserId);
}