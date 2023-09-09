import { Repository } from "typeorm";
import { Schedule, RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import { iScheduleRequest, iScheduleResponse } from "../../interface/schedules.interfaces";
import { AppError } from "../../erro";

const create = async (
    userId: number,
    scheduleData: iScheduleRequest,
): Promise<iScheduleResponse> => {
    const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule);
    const { date, hour, realEstateId } = scheduleData;

    const UserSchedulecheck: Schedule[] = await scheduleRepository
        .createQueryBuilder("schedules")
        .where("schedules.user = :userId", {userId})
        .andWhere("schedules.date = :date", {date})
        .andWhere("schedules.hour = :hour", {hour})
        .getMany();
    if ( UserSchedulecheck.length !== 0 ) {
        throw new AppError("User schedule to this real estate at this date and time already exists", 409);
    }

    const RealEstateSchedulecheck:  Schedule[] = await scheduleRepository
        .createQueryBuilder("schedules")
        .where("schedules.realEstate = :realEstateId", {realEstateId})
        .andWhere("schedules.date = :date", {date})
        .andWhere("schedules.hour = :hour", {hour})
        .getMany()
    if ( RealEstateSchedulecheck.length !== 0 ) {
        throw new AppError("Schedule to this real estate at this date and time already exists", 409);
    }

    const schedule: Schedule = scheduleRepository.create({
        date: scheduleData.date,
        hour: scheduleData.hour,
        realEstate: { id: scheduleData.realEstateId },
        user: { id: userId },
    });

    await scheduleRepository.save(schedule);

    const message: iScheduleResponse = { message: "Schedule created" };

    return message;
}

const read = async (
    realEstateId: number 
): Promise<RealEstate | null> => {
    
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate); 

    const realEstate: RealEstate | null = await realEstateRepository
        .createQueryBuilder("real_estate")
        .leftJoinAndSelect("real_estate.address", "address")
        .leftJoinAndSelect("real_estate.category", "category")
        .leftJoinAndSelect("real_estate.schedules", "schedules")
        .leftJoinAndSelect("schedules.user", "user")
        .where("real_estate.id = :realEstateId", {realEstateId})
        .getOne();
    return realEstate;
};

export default {create, read};