import { type ActionState } from "@/lib/create-safe-actions";
import { type z } from "zod";
import { type ForgotPasswordSchema } from "./schema";

type ReturnData = {
  data: {
    name: string | null;
    email: string;
    forgotPasswordId: string | null;
  } | null;
  emailSent?: boolean;
  error?: string;
};

export type InputType = z.infer<typeof ForgotPasswordSchema>;
export type ReturnType = ActionState<InputType, ReturnData>;
