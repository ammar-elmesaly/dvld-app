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

    const user = await userService.createNewUser(personId, username, password, isActive);

    res.status(201).json(toUserDTO(user));

}