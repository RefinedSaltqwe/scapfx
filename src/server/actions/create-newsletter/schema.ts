import { z } from "zod";

export const CreateNewsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
