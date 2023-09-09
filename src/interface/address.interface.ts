import { z } from "zod";
import { addressSchema, addressRequestSchema } from "../schemas/addresses.schemas";

type iAddressSchema = z.infer<typeof addressSchema>;
type iAddressRequestSchema = z.infer<typeof addressRequestSchema>;

export { iAddressSchema, iAddressRequestSchema }