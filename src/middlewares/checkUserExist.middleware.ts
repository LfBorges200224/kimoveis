import { NextFunction, Response, Request, request } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../erro";

const checkUserExist = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<Response | void> => {
    const userId: number = Number(request.params.id);

    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const user: User | null = await userRepository.findOne({
        where: {
            id: userId
        },
    });

    if(!user){
        throw new AppError("User not found", 404);
    }

    return next();
}

export default checkUserExist;