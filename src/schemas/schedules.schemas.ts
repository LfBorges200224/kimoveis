import { z } from "zod";

const scheduleSchema = z.object({
    id: z.number(),
    date: z.string().regex(/^(\d{4})(\/)(\d{2})(\/)(\d{2})$/),
    hour: z.string().regex(/^\d{2}:\d{2}$/),
    realEstateId: z.number(),
    userId: z.number(),
});

const scheduleRequestSchema = scheduleSchema.omit({id: true, userId: true});

export { scheduleSchema, scheduleRequestSchema }