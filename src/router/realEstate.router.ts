import { Router } from "express";
import { createRealEstateController, listAllRealEstateController } from "../controllers/realEstate.controller";
import checkTokenIsValid from "../middlewares/checkTokenIsValid.middleware";
import checkStatusAdmin from "../middlewares/checkAdminStatus.middleware";
import checkRequestBodyData from "../middlewares/checkRequestBodyUser.middleware";
import { realEstateRequestSchema } from "../schemas/realEstate.schemas";

const realEstateRouter: Router = Router();

realEstateRouter.post("", checkTokenIsValid, checkStatusAdmin, checkRequestBodyData(realEstateRequestSchema), createRealEstateController);

realEstateRouter.get("", listAllRealEstateController)

export default realEstateRouter;