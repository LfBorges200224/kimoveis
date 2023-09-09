import { Router } from "express";
import checkRequestBodyData from "../middlewares/checkRequestBodyUser.middleware";
import { loginSchemaRequest } from "../schemas/login.schemas";
import { createSessionController } from "../controllers/login.controller";

const loginRouter: Router = Router();

loginRouter.post("", checkRequestBodyData(loginSchemaRequest), createSessionController);

export default loginRouter;