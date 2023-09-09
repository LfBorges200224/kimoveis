import { Router } from "express";
import { createCategoryController, listCategoriesController, listRealEstateBycategoryController } from "../controllers/categories.controller";
import checkTokenIsValid from "../middlewares/checkTokenIsValid.middleware";
import checkStatusAdmin from "../middlewares/checkAdminStatus.middleware";
import checkRequestBodyData from "../middlewares/checkRequestBodyUser.middleware";
import { categoryCreateSchema } from "../schemas/categories.schemas";
import checkCategoryExist from "../middlewares/checkCategoryIdExist.middleware";

const categoriesRouter: Router = Router();

categoriesRouter.post("", checkTokenIsValid, checkStatusAdmin, checkRequestBodyData(categoryCreateSchema), createCategoryController);

categoriesRouter.get("", listCategoriesController)

categoriesRouter.get("/:id/realEstate", checkCategoryExist, listRealEstateBycategoryController)

export default categoriesRouter;