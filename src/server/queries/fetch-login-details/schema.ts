import { z } from "zod";

export const FetchUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string(),
});
