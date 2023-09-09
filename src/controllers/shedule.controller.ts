import { Request, Response } from "express";
import schedulesService from "../services/schedules/schedules.service";
import { iScheduleRequest } from "../interface/schedules.interfaces";

const createScheduleController = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const userId: number = Number(response.locals.userId);

    const scheduleData: iScheduleRequest = request.body;

    const schedule = await schedulesService.create(userId, scheduleData);

    return response.status(201).json({message: "Schedule created"});
}

const listAllSchedulesController = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const realEstateId: number = Number(request.params.id);
    
    const realEstateSchedules = await schedulesService.read(realEstateId);

    
    return response.json(realEstateSchedules);
}

export {createScheduleController, listAllSchedulesController}