"use server";
import { db } from "@/server/db";

export const getPresetById = async (id: string) => {
  const response = await db.preset.findUnique({
    where: { id },
    include: {
      beforeAfterImages: true,
      inclusions: true,
      gallery: {
        orderBy: {
          sequence: "asc",
        },
      },
    },
  });

  return response;
};
