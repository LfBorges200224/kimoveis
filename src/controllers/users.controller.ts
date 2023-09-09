import { Request, Response } from "express";
import { iUserListResponse, iUserRequest, iUserUpdateRequest, iUserResponse } from "../interface/users.interface";
import userService from "../services/user/user.service";

const createUserController = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const userData: iUserRequest = request.body;

    const newUser: iUserResponse = await userService.create(userData);

    return response.status(201).json(newUser);
}

const listUserController = async (
    request: Request,
    response: Response
): Promise<Response> =>{
    const userList: iUserListResponse = await userService.read();

    return response.json(userList);
}

const updateUserController = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const userId: number = Number(request.params.id);

    const userData: iUserUpdateRequest = request.body;

    const updatedUser: iUserResponse = await userService.update(userId, userData);

    return response.json(updatedUser);
};

const deleteUserController = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const userId: number = Number(request.params.id);

    await userService.destroy(userId);

    return response.status(204).send();
}

export {createUserController, updateUserController, deleteUserController, listUserController}