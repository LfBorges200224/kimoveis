import { Request, Response } from "express";
import { iCategory, iCategoryCreate, iCategoryRead } from "../interface/categories.interface";
import categoriesService from "../services/category/categories.service";

const createCategoryController = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const payload: iCategoryCreate = request.body;

    const newCategory:  iCategory = await categoriesService.create(payload);

    return response.status(201).json(newCategory);

};

const listCategoriesController = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const categoryList: iCategoryRead = await categoriesService.read();

    return response.json(categoryList);
};

const listRealEstateBycategoryController = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const categoryId: number = response.locals.categoryId;

    const realEstateList = await categoriesService.readByCategory(categoryId);

    return response.json(realEstateList);
};

export {createCategoryController, listCategoriesController, listRealEstateBycategoryController}