import { Router } from "express";
import { createUserController, deleteUserController, listUserController, updateUserController } from "../controllers/users.controller";
import checkEmailExist from "../middlewares/checkEmailExist.middleware";
import checkRequestBodyData from "../middlewares/checkRequestBodyUser.middleware";
import { userUpdateSchema, userRequestSchema } from "../schemas/user.schemas";
import checkTokenIsValid from "../middlewares/checkTokenIsValid.middleware";
import checkStatusAdmin from "../middlewares/checkAdminStatus.middleware";
import checkLoginUserPermission from "../middlewares/checkLoginUserPermission.middleware";
import checkUserExist from "../middlewares/checkUserExist.middleware";

const userRouter: Router = Router();

userRouter.post("", checkRequestBodyData(userRequestSchema), checkEmailExist, createUserController);

userRouter.get("", checkTokenIsValid, checkStatusAdmin, listUserController);

userRouter.patch("/:id", checkUserExist, checkTokenIsValid, checkLoginUserPermission, checkRequestBodyData(userUpdateSchema), updateUserController);

userRouter.delete("/:id", checkUserExist, checkTokenIsValid, checkStatusAdmin, deleteUserController);

export default userRouter;