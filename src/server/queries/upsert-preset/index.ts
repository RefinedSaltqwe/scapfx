"use server";

import { db } from "@/server/db";
import { type PresetAndChildren } from "@/types/prisma";
import {
  type BeforeAfter,
  type Inclusions,
  type Gallery,
} from "@prisma/client";
import cuid from "cuid";

// Utility function to check if two objects are different (shallow comparison)
const hasChanges = (
  oldData: BeforeAfter | Inclusions | Gallery,
  newData: BeforeAfter | Inclusions | Gallery,
) => {
  return JSON.stringify(oldData) !== JSON.stringify(newData);
};

export const upsertPresetQuery = async (item: PresetAndChildren) => {
  // First, upsert the preset (create or update)
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
      id: undefined,
    },
    include: {
      beforeAfterImages: true,
      inclusions: true,
      gallery: true,
    },
  });

  // Handle related beforeAfterImages
  if (item.beforeAfterImages?.length) {
    const existingBeforeAfterImages = await db.beforeAfter.findMany({
      where: { presetId: preset.id },
    });

    const imagesToDelete = existingBeforeAfterImages.filter(
      (existingImage) =>
        !item.beforeAfterImages.some((image) => image.id === existingImage.id),
    );

    if (imagesToDelete.length) {
      await db.beforeAfter.deleteMany({
        where: {
          id: { in: imagesToDelete.map((image) => image.id) },
        },
      });
    }

    await Promise.all(
      item.beforeAfterImages.map(async (image) => {
        if (image.id !== "") {
          const existingImage = await db.beforeAfter.findUnique({
            where: { id: image.id },
          });

          if (!existingImage || hasChanges(existingImage, image)) {
            await db.beforeAfter.upsert({
              where: { id: image.id },
              update: image,
              create: { ...image, presetId: preset.id },
            });
          }
        } else {
          await db.beforeAfter.create({
            data: { ...image, presetId: preset.id, id: undefined },
          });
        }
      }),
    );
  }

  // Handle related inclusions
  if (item.inclusions?.length) {
    await Promise.all(
      item.inclusions.map(async (inclusion) => {
        if (inclusion.id !== "") {
          const existingInclusion = await db.inclusions.findUnique({
            where: { id: inclusion.id },
          });

          if (!existingInclusion || hasChanges(existingInclusion, inclusion)) {
            await db.inclusions.upsert({
              where: { id: inclusion.id },
              update: inclusion,
              create: { ...inclusion, presetId: preset.id },
            });
          }
        } else {
          await db.inclusions.create({
            data: { ...inclusion, presetId: preset.id, id: undefined },
          });
        }
      }),
    );
  }

  // Handle related gallery items (including removal of deleted images)
  if (item.gallery?.length) {
    const existingGalleryItems = await db.gallery.findMany({
      where: { presetId: preset.id },
    });

    const imagesToDelete = existingGalleryItems.filter(
      (existingImage) =>
        !item.gallery.some(
          (galleryItem) => galleryItem.id === existingImage.id,
        ),
    );

    if (imagesToDelete.length) {
      await db.gallery.deleteMany({
        where: {
          id: { in: imagesToDelete.map((image) => image.id) },
        },
      });
    }

    await Promise.all(
      item.gallery.map(async (galleryItem) => {
        if (galleryItem.id !== "") {
          const existingGalleryItem = await db.gallery.findUnique({
            where: { id: galleryItem.id },
          });

          if (
            !existingGalleryItem ||
            hasChanges(existingGalleryItem, galleryItem)
          ) {
            await db.gallery.upsert({
              where: { id: galleryItem.id },
              update: galleryItem,
              create: { ...galleryItem, presetId: preset.id },
            });
          }
        } else {
          await db.gallery.create({
            data: { ...galleryItem, presetId: preset.id, id: undefined },
          });
        }
      }),
    );
  }

  // Fetch the latest data after updates
  const updatedPreset = await db.preset.findUnique({
    where: { id: preset.id },
    include: {
      beforeAfterImages: true,
      inclusions: true,
      gallery: true,
    },
  });

  return updatedPreset!;
};
