import { z } from "zod";

export const UpsertPresetSchema = z.object({
  id: z.string().cuid(),
  productId: z.string(),
  name: z.string(),
  heroImg: z.string().url(),
  description: z.string(),
  price: z.number(),
  prevPrice: z.number(),
  color: z.string(),
  beforeAfterImages: z
    .array(
      z.object({
        id: z.string().cuid(),
        presetId: z.string(),
        beforeImage: z.string().url(),
        afterImage: z.string().url(),
      }),
    )
    .optional(),
  inclusions: z
    .array(
      z.object({
        id: z.string().cuid(),
        presetId: z.string(),
        name: z.string(),
        description: z.string(),
      }),
    )
    .optional(),
  gallery: z
    .array(
      z.object({
        id: z.string().cuid(),
        link: z.string().url(),
        presetId: z.string(),
      }),
    )
    .optional(),
});
