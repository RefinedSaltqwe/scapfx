"use server";

import { createSafeAction } from "@/lib/create-safe-actions";
import { sendEmail } from "@/lib/sendEmail";
import { db } from "@/server/db";
import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { ForgotPasswordSchema } from "./schema";
import { type InputType, type ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { email } = data;

  try {
    // Check if the email exists and update the forgotPasswordId in a single query
    const user = await db.user.update({
      where: { email },
      data: { forgotPasswordId: randomUUID() },
      select: { name: true, email: true, forgotPasswordId: true },
    });

    if (!user) {
      throw new Error("Email does not exist");
    }

    // Send the email
    const emailSent = await sendEmail(
      "forgot_password",
      email,
      user.name ?? "Guest",
      undefined,
      user.forgotPasswordId,
    );

    // Revalidate the page
    revalidatePath(`/forgot-password`);

    return { data: { data: user, emailSent, error: undefined } };
  } catch (error) {
    // Specific error handling
    if (
      error instanceof Prisma.PrismaClientInitializationError ||
      error instanceof Prisma.PrismaClientKnownRequestError
    ) {
      throw new Error("System error. There is an error fetching data.");
    }

    return {
      data: {
        data: null,
        emailSent: false,
        error:
          "We couldn't find an account associated with this email address.",
      },
    };
  }
};

export const forgotPassword = createSafeAction(ForgotPasswordSchema, handler);
