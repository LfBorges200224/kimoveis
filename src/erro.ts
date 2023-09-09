import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";

class AppError extends Error {
    statusCode: number;
    constructor(menssage: string, statusCode = 400) {
        super(menssage);
        this.statusCode = statusCode;
    }
}

const handleError = ( 
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            message: error.message,
        });
    }

    if (error instanceof JsonWebTokenError){
        return response.status(401).json({
            message: error.message,
        });
    }

    if (error instanceof ZodError) {
        return response.status(400).json({
            message: error.flatten().fieldErrors,
        });
    }

    console.error(error);

    return response.status(500).json({
        message: "Internal server error"
    });
};

export { AppError, handleError };