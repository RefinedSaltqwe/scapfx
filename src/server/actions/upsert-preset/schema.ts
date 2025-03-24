import { z } from "zod";

export const UpsertPresetSchema = z.object({
  id: z.string(),
  productId: z.string(),
  name: z.string(),
  heroImg: z.string(),
  description: z.string(),
  createdAt: z.date(),
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
        sequence: z.number().nullable(),
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
        sequence: z.number().nullable(),
      }),
    )
    .optional(),
});
