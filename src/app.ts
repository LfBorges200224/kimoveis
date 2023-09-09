import 'reflect-metadata';
import 'express-async-errors'
import express, { Application } from "express"
import { handleError } from './erro';
import userRouter from './router/user.router';
import loginRouter from './router/login.router';
import categoriesRouter from './router/categories.router';
import realEstateRouter from './router/realEstate.router';
import scheduleRouter from './router/schedules.router';

const app: Application = express();

app.use(express.json());

app.use("/users", userRouter)

app.use("/login", loginRouter)

app.use("/categories", categoriesRouter)

app.use("/realEstate", realEstateRouter)

app.use("/schedules", scheduleRouter)

app.use(handleError)

export default app;
