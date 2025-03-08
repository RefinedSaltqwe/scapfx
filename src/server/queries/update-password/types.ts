import { type ActionState } from "@/lib/create-safe-actions";
import { type User } from "@prisma/client";
import { type z } from "zod";
import { type UpdatePasswordSchema } from "./schema";

type ReturnData = {
  data: User | null;
  error?: string;
};

export type InputType = z.infer<typeof UpdatePasswordSchema>;
export type ReturnType = ActionState<InputType, ReturnData>;
