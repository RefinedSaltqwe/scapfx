"use server";
import { createSafeAction } from "@/lib/create-safe-actions";
import { revalidatePath } from "next/cache";
import { UpsertPresetSchema } from "./schema";
import { type InputType, type ReturnType } from "./types";
import { upsertPresetQuery } from "@/server/queries/upsert-preset";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id } = data;
  let response;

  // Default undefined arrays to empty arrays
  const presetData = {
    ...data,
    beforeAfterImages: data.beforeAfterImages ?? [],
    inclusions: data.inclusions ?? [],
    gallery: data.gallery ?? [],
  };

  try {
    response = await upsertPresetQuery(presetData);

    revalidatePath(`/admin/product-catalog/update/${id}`, "page");
    return { data: response };
  } catch (error) {
    console.error("User creation error:", error);
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};

export const upsertPreset = createSafeAction(UpsertPresetSchema, handler);
