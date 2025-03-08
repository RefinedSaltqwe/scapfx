"use server";

import { createSafeAction } from "@/lib/create-safe-actions";
import { db } from "@/server/db";
import { Prisma, type User } from "@prisma/client";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { ForgotPasswordSchema } from "./schema";
import { type InputType, type ReturnType } from "./types";
import { sendEmail } from "@/lib/sendEmail";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { email } = data;

  let user: User | null = null;
  let emailSent;

  try {
    const emailExist = await db.user.findUnique({
      where: { email },
    });

    if (!emailExist) {
      throw new Error("Email does not exist");
    }

    const uuid = randomUUID();

    user = await db.user.update({
      where: { email },
      data: { forgotPasswordId: uuid },
    });

    if (user) {
      emailSent = await sendEmail(
        "forgot_password",
        email,
        user?.name ?? "Guest",
        undefined,
        user.forgotPasswordId,
      );
    }
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientInitializationError ||
      error instanceof Prisma.PrismaClientKnownRequestError
    ) {
      throw new Error("System error. There is an error fetching data.");
    }

    return {
      data: {
        data: null,
        emailSent: emailSent,
        error:
          "We couldn't find an account associated with this email address.",
      },
    };
  }

  revalidatePath(`/forgot-password`);
  return { data: { data: user, emailSent, error: undefined } };
};

export const forgotPassword = createSafeAction(ForgotPasswordSchema, handler);
