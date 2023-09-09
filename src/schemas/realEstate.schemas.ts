import { z } from "zod";
import { addressRequestSchema, addressSchema } from "./addresses.schemas";

const realEstateSchema = z.object({
    id: z.number(),
    value: z.string().or(z.number().nonnegative()),
    size: z.number().int().positive(),
    sold: z.boolean().default(false),
    address: addressRequestSchema,
    createAt: z.string(),
    updateAt: z.string(),
    categoryId: z.number(),
});

const realEstateRequestSchema = realEstateSchema.omit({
    id: true, 
    sold: true,
    createAt: true, 
    updateAt: true, 
});

const realEstateSchemaResponse = z.object({
    id: z.number(),
    sold: z.boolean().default(false),
    value: z.string().or(z.number().nonnegative()),
    size: z.number().int().positive(),
    createAt: z.string(),
    updateAt: z.string(),
    address: addressSchema,
});

const realEstateListSchemaResponse = realEstateSchemaResponse.array();

export { realEstateSchema, realEstateRequestSchema, realEstateListSchemaResponse }