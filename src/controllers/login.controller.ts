import { Request, Response } from "express";
import { iLoginRequest, iLoginResponse } from "../interface/login.interface";
import sessionServiceCreate from "../services/login/createSession.service";

const createSessionController = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const login: iLoginRequest = request.body;

    const token: iLoginResponse = await sessionServiceCreate(login);

    return response.json(token);
}

export {createSessionController};