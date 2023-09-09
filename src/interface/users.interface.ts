import { z } from "zod";
import { 
    userSchema, 
    userEmailRequestSchema,
    userListResponseSchema,
    userRequestSchema,
    userResponseSchema,
    userUpdateSchema 
} from "../schemas/user.schemas";
import { DeepPartial } from "typeorm";

type iUser = z.infer<typeof userSchema>;
type iUserRequest = z.infer<typeof userRequestSchema>;
type iUserResponse = z.infer<typeof userResponseSchema>;
type iUserEmailRequest = z.infer<typeof userEmailRequestSchema>
type iUserListResponse = z.infer<typeof userListResponseSchema>
type iUserUpdateRequest = DeepPartial<typeof userUpdateSchema>

export { iUser, iUserRequest, iUserResponse, iUserEmailRequest, iUserListResponse, iUserUpdateRequest} 