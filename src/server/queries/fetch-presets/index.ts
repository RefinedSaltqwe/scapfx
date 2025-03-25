"use server";
import { db } from "@/server/db";

export const getPresets = async () => {
  const response = await db.preset.findMany({
    include: {
      beforeAfterImages: true,
      inclusions: true,
      gallery: {
        orderBy: {
          sequence: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response;
};
