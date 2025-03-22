import { z } from "zod";

export const UpsertPresetSchema = z.object({
  id: z.string(),
  productId: z.string(),
  name: z.string(),
  heroImg: z.string(),
  description: z.string(),
  price: z.number(),
  prevPrice: z.number(),
  color: z.string(),
  beforeAfterImages: z
    .array(
      z.object({
        id: z.string(),
        presetId: z.string(),
        beforeImage: z.string(),
        afterImage: z.string(),
      }),
    )
    .optional(),
  inclusions: z
    .array(
      z.object({
        id: z.string(),
        presetId: z.string(),
        name: z.string(),
        description: z.string(),
      }),
    )
    .optional(),
  gallery: z
    .array(
      z.object({
        id: z.string(),
        link: z.string(),
        presetId: z.string(),
      }),
    )
    .optional(),
});
