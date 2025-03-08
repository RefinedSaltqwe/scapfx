"use server";

import { createSafeAction } from "@/lib/create-safe-actions";
import { db } from "@/server/db";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { UpdatePasswordSchema } from "./schema";
import { type InputType, type ReturnType } from "./types";

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

const handler = async (data: InputType): Promise<ReturnType> => {
  const { email, password, id } = data;

  try {
    const user = await db.user.update({
      where: { email, forgotPasswordId: id },
      data: {
        forgotPasswordId: null,
        password: await hashPassword(password),
      },
    });

    revalidatePath(`/forgot-password/verified`);

    return { data: { data: user, error: undefined } };
  } catch (error) {
    const errorMessage =
      error instanceof Prisma.PrismaClientKnownRequestError ||
      error instanceof Prisma.PrismaClientInitializationError
        ? "System error. There is an error fetching data."
        : "Error changing your password.";

    return {
      data: {
        data: null,
        error: errorMessage,
      },
    };
  }
};

export const updatePassword = createSafeAction(UpdatePasswordSchema, handler);
