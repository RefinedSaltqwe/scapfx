import { z } from "zod";

export const UpdatePriceIdSchema = z.object({
  id: z.string(),
  productId: z.string(),
});
