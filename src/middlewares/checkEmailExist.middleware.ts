import { NextFunction, Request, Response } from "express";
import { iUserEmailRequest } from "../interface/users.interface";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../erro";

const checkEmailExist = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<Response | void> => {
    const user: iUserEmailRequest = request.body;

    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const foundUser: User | null = await userRepository.findOne({
        where: {
            email: user.email
        },
    });

    if(foundUser){
        throw new AppError("Email already exists", 409);
    }

    return next();
}

export default checkEmailExist;