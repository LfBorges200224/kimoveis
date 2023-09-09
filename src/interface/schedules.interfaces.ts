import { z } from "zod";
import { scheduleSchema, scheduleRequestSchema } from "../schemas/schedules.schemas";

type iSchedule = z.infer<typeof scheduleSchema>;
type iScheduleRequest = z.infer<typeof scheduleRequestSchema>;
type iScheduleResponse = {
    message: string,
};

export { iSchedule, iScheduleRequest, iScheduleResponse }