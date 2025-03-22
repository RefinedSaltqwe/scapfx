import { type ActionState } from "@/lib/create-safe-actions";
import { type PresetAndChildren } from "@/types/prisma";
import { type z } from "zod";
import { type UpsertPresetSchema } from "./schema";

export type InputType = z.infer<typeof UpsertPresetSchema>;
export type ReturnType = ActionState<InputType, PresetAndChildren>;
