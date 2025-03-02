"use server";
import { db } from "@/server/db";

export const getPresets = async () => {
  const response = await db.preset.findMany({
    include: {
      beforeAfterImages: true,
      inclusions: true,
      gallery: true,
    },
  });

  return response;
};
