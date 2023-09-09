import { z } from "zod";
import { categorySchema, categoryCreateSchema, categoryReadSchema } from "../schemas/categories.schemas";

type iCategory = z.infer<typeof categorySchema>;
type iCategoryCreate = z.infer<typeof categoryCreateSchema>;
type iCategoryRead = z.infer<typeof categoryReadSchema>;

export { iCategory, iCategoryCreate, iCategoryRead }