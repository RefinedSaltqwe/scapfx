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
import { fetchTotalAmount } from "@/lib/fetchTotalAmount";

// ✅ Extracted email sender function

const handler = async (data: InputType): Promise<ReturnType> => {
  const { priceId, userEmail, stripeSessionId, createdAt, legalAgreement } =
    data;
  const date = new Date(createdAt * 1000);

  try {
    // Fetch presets and check user existence
    const [presets, existingUser, existingSessionId] = await Promise.all([
      db.preset.findMany({ where: { productId: { in: priceId } } }),
      db.user.findUnique({
        where: { email: userEmail },
        include: { ownedPresets: true },
      }),
      db.presetUser.findFirst({
        where: { stripeSessionId },
      }),
    ]);

    if (existingSessionId) {
      throw new Error("Order already exist.");
    }

    const orderId = shortid.generate();

    const presetUserData = await Promise.all(
      presets.map(async (preset) => {
        // Fetch the price asynchronously using fetchPrice function
        const fetchedPrice = await fetchPrice(preset.productId);
        const tap = await fetchTotalAmount(stripeSessionId);

        // Return the updated preset with the fetchedPrice as purchasedPrice
        return {
          presetId: preset.id,
          legalAgreement,
          orderId,
          userEmail,
          stripeSessionId,
          createdAt: date.toISOString(),
          purchasedPrice: fetchedPrice, // Use fetchedPrice as purchasedPrice
          totalAmountPaid: tap, //Total Amount Paid by the customer
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
        userEmail,
        existingUser?.name ?? "Guest",
        stripeSessionId,
        undefined,
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
