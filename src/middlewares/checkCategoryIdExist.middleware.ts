import { NextFunction, Response, Request } from "express";
import { Repository } from "typeorm";
import { Category } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../erro";

const checkCategoryIdExist = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<Response | void> => {
    const categoryId: number = Number(request.params.id);

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

    const category: Category | null = await categoryRepository.findOne({
        where: {
            id: categoryId
        }
    });

    if(!category){
        throw new AppError("Category not found", 404);
    }

    response.locals.categoryId = categoryId;

    return next();
}

export default checkCategoryIdExist;