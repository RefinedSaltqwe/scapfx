"use server";
import { createSafeAction } from "@/lib/create-safe-actions";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { CreateUserSchema } from "./schema";
import { type InputType, type ReturnType } from "./types";
import bcrypt from "bcryptjs";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { email, password } = data;
  let newUser;
  try {
    // Check if user exists
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("User already exists.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create user
    newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        accounts: {
          create: {
            type: "CLIENT",
            provider: "credentials",
            providerAccountId: "",
          },
        },
      },
      include: {
        accounts: true,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        error: err.message,
      };
    }
  }

  revalidatePath(`/signup`, "page");
  return { data: newUser };
};

export const createUser = createSafeAction(CreateUserSchema, handler);
