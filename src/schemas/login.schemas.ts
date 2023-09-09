import { z } from "zod";

const loginSchemaRequest = z.object({
    email: z.string().email(),
    password: z.string(),
})

const loginSchemaResponse = z.object({
    token: z.string(),
})

export { loginSchemaRequest, loginSchemaResponse }