import { NextFunction, Request, Response, request } from "express";
import { AppError } from "../erro";

const checkStatusAdmin = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { admin } = response.locals.decoded;

    if(!admin){
        throw new AppError("Insufficient permission", 403);
    }

    return next();
}

export default checkStatusAdmin;