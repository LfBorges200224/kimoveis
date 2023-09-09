import { Repository } from "typeorm";
import { iUserRequest, iUserResponse, iUserListResponse, iUserUpdateRequest } from "../../interface/users.interface";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { userResponseSchema, userListResponseSchema } from "../../schemas/user.schemas";


const create = async (
    userData: iUserRequest
): Promise<iUserResponse> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const createdUser: User = userRepository.create(userData);

    await userRepository.save(createdUser);

    const newUser: iUserResponse = userResponseSchema.parse(createdUser);

    return newUser;
}

const read = async (): Promise<iUserListResponse> => { 
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const users: User[] = await userRepository.find();

    const usersList: iUserListResponse = userListResponseSchema.parse(users);

    return usersList;
}

const update = async (
    userId: number,
    userData: iUserUpdateRequest
): Promise<iUserResponse> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const foundUser: User | null = await userRepository.findOne({
        where: {
            id: userId,
        },
    });

    const newUserData: User = userRepository.create({
        ...foundUser,
        ...userData,
    })

    await userRepository.save(newUserData);
    
    const updatedUser: iUserResponse = userResponseSchema.parse(newUserData);

    return updatedUser;
}

const destroy = async (userId: number): Promise<void> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const user: User | null = await userRepository.findOne({
        where: {
            id: userId
        },
    });

    await userRepository.remove(user!);
}

export default {create, read, update, destroy};