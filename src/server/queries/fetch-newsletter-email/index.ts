"use server";
import { db } from "@/server/db";

export const getNewsletterByEmail = async (email: string) => {
  const response = await db.newsLetter.findUnique({
    where: { email },
  });

  return response;
};
