import { z } from "zod";

const categorySchema = z.object({
    id: z.number(),
    name: z.string().max(45),
});

const categoryCreateSchema = categorySchema.omit({id: true});
const categoryReadSchema = categorySchema.array();

export { categorySchema, categoryCreateSchema, categoryReadSchema }