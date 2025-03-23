"use server";
import { createSafeAction } from "@/lib/create-safe-actions";
import { db } from "@/server/db";
import cuid from "cuid";
import { revalidatePath } from "next/cache";
import { UpdatePriceIdSchema } from "./schema";
import { type InputType, type ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id, productId } = data;
  let response;

  try {
    response = await db.preset.update({
      where: id ? { id: id } : { id: cuid() },
      data: {
        productId,
      },
      include: {
        beforeAfterImages: true,
        inclusions: true,
        gallery: true,
      },
    });

    revalidatePath(`/admin/product-catalog`, "page");
    return { data: response };
  } catch (error) {
    console.error("User creation error:", error);
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};

export const updatePriceId = createSafeAction(UpdatePriceIdSchema, handler);
