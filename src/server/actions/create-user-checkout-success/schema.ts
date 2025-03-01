import { z } from "zod";

export const CreateUserPresetSchema = z.object({
  priceId: z.array(z.string()),
  userEmail: z.string(),
  createdAt: z.number(),
  stripeSessionId: z.string(),
});
