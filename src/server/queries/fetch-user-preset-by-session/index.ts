"use server";
import { db } from "@/server/db";
import { type User } from "@/types";
import { cache } from "react";

export const getUserByStripeSessionId = cache(
  async (session_id: string): Promise<User | null> => {
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
        accounts: true,
        sessions: true,
        posts: true,
      },
    });

    // Return the user or null if no user is found
    return user as User;
  },
);
