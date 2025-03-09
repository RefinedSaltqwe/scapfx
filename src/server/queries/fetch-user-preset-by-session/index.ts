"use server";
import { type CurrentUserPrisma } from "@/types/prisma";
import { db } from "@/server/db";
import { cache } from "react";

export const getUserByStripeSessionId = cache(
  async (session_id: string): Promise<CurrentUserPrisma | null> => {
    // Find the preset user by stripeSessionId
    const presetUser = await db.presetUser.findFirst({
      where: { stripeSessionId: session_id },
    });

    // If no presetUser is found, return null early
    if (!presetUser) {
      return null;
    }

    // Use the userEmail from presetUser to find the corresponding user
    const user = await db.user.findUnique({
      where: { email: presetUser.userEmail },
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
