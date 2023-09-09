import { z } from "zod";

const userSchema = z.object({
    id: z.number(),
    name: z.string().max(45),
    email: z.string().max(45).email(),
    password: z.string().max(120),
    admin: z.boolean().default(false),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
})

const userRequestSchema = userSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
});

const userResponseSchema = userSchema.omit({
    password: true,
});

const userEmailRequestSchema = userSchema.pick({
    email: true,
});

const userListResponseSchema = z.array(userResponseSchema);
const userUpdateSchema = userRequestSchema.omit({admin: true}).partial();

export { userSchema, userRequestSchema, userResponseSchema, userEmailRequestSchema, userListResponseSchema, userUpdateSchema }