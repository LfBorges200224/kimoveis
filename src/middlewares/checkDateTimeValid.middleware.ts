import { NextFunction, Request, Response } from "express";
import { AppError } from "../erro";
import { iScheduleRequest } from "../interface/schedules.interfaces";

const checkDateTimeValid = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<Response | void> => {
    const scheduleData: iScheduleRequest = request.body;

    const { date, hour } = scheduleData;

    const [year, month, day]: Array<number> = date.split('/').map(Number);

    const [hourOfDay, minute]: Array<number> = hour.split(':').map(Number);

    const scheduleDateTime = new Date(year, month - 1, day, hourOfDay, minute);

    if(scheduleDateTime.getHours() < 8 || scheduleDateTime.getHours() >= 18){
        throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
    };

    if(scheduleDateTime.getDay() === 0 || scheduleDateTime.getDay() === 6){
        throw new AppError("Invalid date, work days are monday to friday", 400);
    };

    return next();
};

export default checkDateTimeValid;