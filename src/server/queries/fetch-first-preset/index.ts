"use server";
import { db } from "@/server/db";

export const getFirstPreset = async () => {
  const response = await db.preset.findFirst({
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
