"use server";
import { db } from "@/server/db";

export const getPresetNav = async () => {
  const response = await db.preset.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      prevPrice: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return response;
};
