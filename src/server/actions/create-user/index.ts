"use server";
import { createSafeAction } from "@/lib/create-safe-actions";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { CreateUserSchema } from "./schema";
import { type InputType, type ReturnType } from "./types";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { email, password, name } = data;

  try {
    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email } });

    if (existingUser) {
      // Update user if password is "N/A" (indicating a guest account)
      if (existingUser.password === "N/A") {
        const updatedUser = await db.user.update({
          where: { email },
          data: { name, password: await bcrypt.hash(password, 10) },
        });

        revalidatePath("/signup", "page");
        return { data: updatedUser };
      }

      return { error: "User already exists." };
    }

    // Create new user
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        accounts: {
          create: {
            type: "CLIENT",
            provider: "credentials",
            providerAccountId: randomUUID(),
          },
        },
      },
    });

    revalidatePath("/signup", "page");
    return { data: newUser };
  } catch (error) {
    console.error("User creation error:", error);
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};

export const createUser = createSafeAction(CreateUserSchema, handler);
