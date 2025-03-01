import { type ActionState } from "@/lib/create-safe-actions";
import { type z } from "zod";
import { type CreateUserPresetSchema } from "./schema";

export type InputType = z.infer<typeof CreateUserPresetSchema>;
export type ReturnType = ActionState<InputType, { count: number }>;
