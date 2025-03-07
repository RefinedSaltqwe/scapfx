"use server";

import { createSafeAction } from "@/lib/create-safe-actions";
import { fetchPrice } from "@/lib/fetchPrice";
import { sendEmail } from "@/lib/sendEmail";
import { db } from "@/server/db";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import shortid from "shortid";
import { CreateUserPresetSchema } from "./schema";
import { type InputType, type ReturnType } from "./types";

// ✅ Extracted email sender function

const handler = async (data: InputType): Promise<ReturnType> => {
  const { priceId, userEmail, stripeSessionId, createdAt } = data;
  const date = new Date(createdAt * 1000);

  try {
    // Fetch presets and check user existence
    const [presets, existingUser] = await Promise.all([
      db.preset.findMany({ where: { productId: { in: priceId } } }),
      db.user.findUnique({
        where: { email: userEmail },
        include: { ownedPresets: true },
      }),
    ]);

    const orderId = shortid.generate();

    const presetUserData = await Promise.all(
      presets.map(async (preset) => {
        // Fetch the price asynchronously using fetchPrice function
        const fetchedPrice = await fetchPrice(preset.productId);

        // Return the updated preset with the fetchedPrice as purchasedPrice
        return {
          presetId: preset.id,
          orderId,
          userEmail,
          stripeSessionId,
          createdAt: date.toISOString(),
          purchasedPrice: fetchedPrice, // Use fetchedPrice as purchasedPrice
        };
      }),
    );

    // Filter out already owned presets
    // const ownedPresetIds = new Set(
    //   existingUser?.ownedPresets.map((p) => p.presetId) ?? [],
    // );
    // const newPresetUserData = presetUserData.filter(
    //   (p) => !ownedPresetIds.has(p.presetId),
    // );

    //? Not filtering out
    const newPresetUserData = presetUserData;

    let emailSent = false;

    if (newPresetUserData.length > 0) {
      // If the user doesn't exist, create it first
      if (!existingUser) {
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
      }

      // Insert new preset-user relationships
      await db.presetUser.createMany({ data: newPresetUserData });

      emailSent = await sendEmail(
        "checkout_success",
        existingUser?.name ?? "Guest",
        userEmail,
        stripeSessionId,
      );
    }

    revalidatePath(`/shop/checkout_success`, "page");
    return { data: { count: newPresetUserData.length, success: emailSent } };
  } catch (error) {
    console.error("Error in createUserPreset:", error);
    return { error: "Something went wrong. Please try again later." };
  }
};

export const createUserPreset = createSafeAction(
  CreateUserPresetSchema,
  handler,
);
