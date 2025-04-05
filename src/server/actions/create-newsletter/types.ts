import { type ActionState } from "@/lib/create-safe-actions";
import { type z } from "zod";
import { type CreateNewsletterSchema } from "./schema";

type News = {
  emailSent: boolean;
  created: boolean;
};

export type InputType = z.infer<typeof CreateNewsletterSchema>;
export type ReturnType = ActionState<InputType, News>;
