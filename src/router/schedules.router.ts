import { Router } from "express";
import { createScheduleController, listAllSchedulesController } from "../controllers/shedule.controller";
import checkTokenIsValid from "../middlewares/checkTokenIsValid.middleware";
import checkRequestBodyData from "../middlewares/checkRequestBodyUser.middleware";
import { scheduleRequestSchema } from "../schemas/schedules.schemas";
import checkRealEstateExist from "../middlewares/checkRealEstateExist.middleware";
import checkDateTimeValid from "../middlewares/checkDateTimeValid.middleware";
import checkStatusAdmin from "../middlewares/checkAdminStatus.middleware";

const scheduleRouter: Router = Router();

scheduleRouter.post("", checkTokenIsValid, checkRequestBodyData(scheduleRequestSchema), checkRealEstateExist, checkDateTimeValid, createScheduleController);

scheduleRouter.get("/realEstate/:id", checkTokenIsValid, checkStatusAdmin, checkRealEstateExist, listAllSchedulesController)

export default scheduleRouter;