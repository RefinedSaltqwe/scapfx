"use server";
import { createSafeAction } from "@/lib/create-safe-actions";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { CreateNewsletterSchema } from "./schema";
import { type InputType, type ReturnType } from "./types";
import { sendEmail } from "@/lib/sendEmail";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { email } = data;

  try {
    // Check if email already exists
    const existingEMail = await db.newsLetter.findUnique({ where: { email } });

    if (existingEMail) {
      return { error: "Email already exists." };
    }

    // Create new user
    const newSubscriber = await db.newsLetter.create({
      data: {
        email,
      },
    });

    if (!newSubscriber) {
      return { data: { emailSent: false, created: false } };
    }

    const emailSent = await sendEmail(
      "newsletter",
      email,
      "Guest",
      undefined,
      undefined,
    );
    if (!emailSent) {
      return { data: { emailSent: emailSent, created: true } };
    }

    revalidatePath("/shop", "page");
    return { data: { emailSent: emailSent, created: true } };
  } catch (error) {
    console.error("User creation error:", error);
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};

export const createNewsletter = createSafeAction(
  CreateNewsletterSchema,
  handler,
);
