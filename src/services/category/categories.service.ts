import { Repository } from "typeorm";
import { iCategory, iCategoryCreate, iCategoryRead } from "../../interface/categories.interface";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import { categorySchema, categoryReadSchema } from "../../schemas/categories.schemas";
import { AppError } from "../../erro";

const create = async ( payload: iCategoryCreate ): Promise<iCategory> => {
    const repository: Repository<Category> =
        AppDataSource.getRepository(Category);
    const category: Category | null = await repository.findOne({
        where: {
            name: payload.name,
        },
    });

    if (category) {
        throw new AppError("Category already exists", 409);
    }

    const createCategory: Category = repository.create(payload);

    await repository.save(createCategory);

    const newCategory: iCategory = categorySchema.parse(createCategory)

    return newCategory;
}

const read = async (): Promise<iCategoryRead> => {
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

    const categories: Category[] = await categoryRepository.find();

    const result: iCategoryRead = categoryReadSchema.parse(categories);

    return result;
}

const readByCategory = async (
    categoryId: number
): Promise<Category | null> => {
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

    const categoryRealEstate: Category | null = await categoryRepository
        .createQueryBuilder("categories")
        .leftJoinAndSelect("categories.realEstate", "realEstate")
        .where("categories.id = :categoryId", {categoryId})
        .getOne()
    return categoryRealEstate;    
}

export default {create, readByCategory, read};