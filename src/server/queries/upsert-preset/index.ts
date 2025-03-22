"use server";

import { db } from "@/server/db";
import { type PresetAndChildren } from "@/types/prisma";
import cuid from "cuid";

export const upsertPresetQuery = async (item: PresetAndChildren) => {
  // First, upsert the preset
  const preset = await db.preset.upsert({
    where: item.id ? { id: item.id } : { id: cuid() }, // Ensure `where` always has a valid value
    update: {
      name: item.name,
      productId: item.productId,
      heroImg: item.heroImg,
      description: item.description,
      price: item.price,
      prevPrice: item.prevPrice,
      color: item.color,
    },
    create: {
      name: item.name,
      productId: item.productId,
      heroImg: item.heroImg,
      description: item.description,
      price: item.price,
      prevPrice: item.prevPrice,
      color: item.color,
      id: cuid(), // Generate random UUID for new preset
    },
    include: {
      beforeAfterImages: true,
      inclusions: true,
      gallery: true,
    },
  });

  // Then, upsert the related beforeAfterImages
  if (item.beforeAfterImages?.length) {
    await Promise.all(
      item.beforeAfterImages.map(async (image) => {
        await db.beforeAfter.upsert({
          where: { id: image.id }, // Look for existing record by ID
          update: image, // Update existing entry with new data
          create: { ...image, presetId: preset.id }, // Create new entry if not found
        });
      }),
    );
  }

  // Upsert the related inclusions
  if (item.inclusions?.length) {
    await Promise.all(
      item.inclusions.map(async (inclusion) => {
        await db.inclusions.upsert({
          where: { id: inclusion.id }, // Look for existing record by ID
          update: inclusion, // Update existing entry with new data
          create: { ...inclusion, presetId: preset.id }, // Create new entry if not found
        });
      }),
    );
  }

  // Upsert the related gallery items
  if (item.gallery?.length) {
    await Promise.all(
      item.gallery.map(async (galleryItem) => {
        await db.gallery.upsert({
          where: { id: galleryItem.id }, // Look for existing record by ID
          update: galleryItem, // Update existing entry with new data
          create: { ...galleryItem, presetId: preset.id }, // Create new entry if not found
        });
      }),
    );
  }

  return preset;
};
