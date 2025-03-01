"use server";
import { db } from "@/server/db";

export const getUserPresets = async (session_id: string) => {
  const response = await db.presetUser.findMany({
    where: {
      stripeSessionId: session_id,
    },
    include: {
      user: true,
      preset: true,
    },
  });

  return response;
};
