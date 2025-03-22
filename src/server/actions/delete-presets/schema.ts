import { z } from "zod";

export const DeletePresets = z.object({
  ids: z.string().array(),
});
