"use server";
import { createSafeAction } from "@/lib/create-safe-actions";
import { db } from "@/server/db";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { CreateUserPresetSchema } from "./schema";
import { type InputType, type ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { priceId, userEmail, stripeSessionId, createdAt } = data;

  const date = new Date(createdAt * 1000);

  try {
    // Fetch Preset from db
    const presets = await db.preset.findMany({
      where: {
        productId: {
          in: priceId,
        },
      },
    });

    const presetId = presets.map((item) => item.id);

    const presetUserData = presetId.map((id) => ({
      presetId: id,
      userEmail,
      stripeSessionId,
      createdAt: date.toISOString(),
    }));

    // Check if user exist
    const userExist = await db.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        presets: true,
      },
    });
    // Check if userPreset exist
    const userPresetExist = await db.presetUser.findMany({
      where: {
        stripeSessionId,
      },
    });

    // Check if the user already exists
    if (!userExist) {
      // If user do not exist => create user then insert presetUser data
      await db.user.create({
        data: {
          email: userEmail,
          password: "N/A",
          accounts: {
            create: {
              type: "CLIENT",
              provider: "credentials",
              providerAccountId: randomUUID(),
            },
          },
        },
      });
      // Insert preset right after user creation
      await db.presetUser.createMany({
        data: presetUserData,
      });
    } // If user exists insert preset to presetUser
    else if (userPresetExist.length === 0) {
      // Check if presets exist already
      // If stripe session doesn't exist. Then, create data
      await db.presetUser.createMany({
        data: presetUserData,
      });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        error: err.message,
      };
    }
  }

  revalidatePath(`/shop/checkout_success`, "page");
  return { data: { count: 0 } };
};

export const createUserPreset = createSafeAction(
  CreateUserPresetSchema,
  handler,
);
