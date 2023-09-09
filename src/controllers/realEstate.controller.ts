import { Request, Response } from "express";
import { iRealEstateRequest } from "../interface/realEstate.interface";
import realEstateServiceCreate from "../services/realEstate/createRealEstate.service";
import listAllRealEstateService from "../services/realEstate/listAllRealEstate.service";

const createRealEstateController = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const realEstateData: iRealEstateRequest = request.body;

    const newRealEstate = await realEstateServiceCreate(realEstateData);

    return response.status(201).json(newRealEstate);
}

const listAllRealEstateController = async (
    request: Request,
    response: Response
): Promise<Response> => {
    const realEstateList = await listAllRealEstateService();

    return response.json(realEstateList);
}

export {createRealEstateController, listAllRealEstateController}