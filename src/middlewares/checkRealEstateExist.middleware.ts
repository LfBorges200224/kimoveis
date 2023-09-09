import { NextFunction, Response, Request } from "express";
import { Repository } from "typeorm";
import { RealEstate } from "../entities";
import { AppDataSource } from "../data-source";
import { iScheduleRequest } from "../interface/schedules.interfaces";
import { AppError } from "../erro";

const checkRealEstateExist = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<Response | void> => {
    const scheduleData: iScheduleRequest = request.body;

    const {realEstateId} = scheduleData;

    const {id} = request.params;
    
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

    const realEstate: RealEstate | null = await realEstateRepository.findOne({
        where: {
            id: realEstateId || Number(id)
        },
    });

    if(!realEstate){
        throw new AppError("RealEstate not found", 404);
    };

    return next();
};

export default checkRealEstateExist;