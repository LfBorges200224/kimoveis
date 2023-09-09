import { NextFunction, Response, Request, request } from "express";
import { AppError } from "../erro";

const checkLoginUserPermission = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<Response | void> => {
    const id = Number(request.params.id);

    const {admin} = response.locals.decoded;

    const userId = Number(response.locals.userId);

    if(!admin && userId !== id){
        throw new AppError("Insufficient permission", 403);
    }

    return next();
}

export default checkLoginUserPermission;