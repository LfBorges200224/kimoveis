import { Repository } from "typeorm";
import { iLoginRequest, iLoginResponse } from "../../interface/login.interface";
import  User from "../../entities/user.entitie";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../erro";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const sessionServiceCreate = async ( 
    login: iLoginRequest,
): Promise<iLoginResponse> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const user: User | null = await userRepository.findOne({
        where: {
            email: login.email,
        },
    });

    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }

    const passwordMatched = await bcrypt.compare(login.password, user.password);

    if (!passwordMatched) {
        throw new AppError("Invalid credentials", 401);
    }

    const token: string = jwt.sign(
        {admin: user.admin},
        process.env.SECRET_KEY!,
        {
            expiresIn: process.env.EXPIRES_IN,
            subject: String(user.id),
        }
    );
    return {token};
}

export default sessionServiceCreate;