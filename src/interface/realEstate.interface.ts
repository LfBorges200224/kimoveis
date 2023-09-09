import { z } from "zod";
import { realEstateSchema, realEstateRequestSchema, realEstateListSchemaResponse } from "../schemas/realEstate.schemas";

type iRealEstate = z.infer<typeof realEstateSchema>;
type iRealEstateRequest = z.infer<typeof realEstateRequestSchema>;
type iRealEstateList = z.infer<typeof realEstateListSchemaResponse>;

export { iRealEstate, iRealEstateRequest, iRealEstateList }