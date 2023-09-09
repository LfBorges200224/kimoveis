import { NextFunction, Response, Request } from "express";
import { AppError } from "../erro";
import  jwt  from "jsonwebtoken";
import "dotenv/config";

const checkTokenIsValid = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<Response | void> => { 
    let token = request.headers.authorization;

    if(!token){
        throw new AppError("Missing bearer token", 401);
    }
    
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY!)
        
        response.locals = {...response.locals, decoded}
        response.locals = {...response.locals, userId: decoded.sub}
    
    return next();
}

export default checkTokenIsValid;