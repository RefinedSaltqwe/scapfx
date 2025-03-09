"use server";
import { type CurrentUserPrisma } from "@/hooks/stores/useLoggedUser";
import { db } from "@/server/db";
import { cache } from "react";

export const getUser = cache(
  async (id: string): Promise<CurrentUserPrisma | null> => {
    // Use the userEmail from presetUser to find the corresponding user
    const user = await db.user.findUnique({
      where: { id },
      include: {
        ownedPresets: {
          include: {
            preset: true,
          },
        },
      },
    });

    // Return the user or null if no user is found
    return user as CurrentUserPrisma;
  },
);
